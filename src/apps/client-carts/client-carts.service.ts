import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { CartInDto } from '@/dto/cart.dto';
import { PrismaService } from '@/services/prisma/prisma.service';

@Injectable()
export class ClientCartsService {
  constructor(private prisma: PrismaService) {}

  async findAll(user: User) {
    return await this.prisma.cart.findMany({
      where: { user },
      include: {
        products: {
          include: {
            product: { include: { category: true } },
          },
        },
      },
    });
  }

  async findOne(id: string, user: User) {
    // 檢查是否有此購物車
    const cart = await this.prisma.cart.findUnique({
      where: { id, user },
      include: {
        products: {
          include: {
            product: { include: { category: true } },
          },
        },
      },
    });
    if (!cart) {
      throw new BadRequestException('沒有找到對應購物車');
    }

    return cart;
  }

  async create(data: CartInDto, user: User) {
    const { products } = data;
    // 檢查是否有此產品
    const productIds = products.map((product) => product.productId);
    const productCount = await this.prisma.product.count({
      where: { id: { in: productIds } },
    });
    if (productCount !== productIds.length) {
      throw new BadRequestException('沒有找到對應產品');
    }

    return await this.prisma.cart.create({
      data: {
        userId: user.id,
        products: {
          create: products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
      include: {
        products: {
          include: {
            product: { include: { category: true } },
          },
        },
      },
    });
  }

  async update(id: string, data: CartInDto, user: User) {
    // 檢查是否有此購物車
    const { products } = data;
    // 檢查是否有此產品
    const productIds = products.map((product) => product.productId);
    const productCount = await this.prisma.product.count({
      where: { id: { in: productIds } },
    });
    if (productCount !== productIds.length) {
      throw new BadRequestException('沒有找到對應產品');
    }

    return await this.prisma.cart.update({
      data: {
        userId: user.id,
        products: {
          deleteMany: {}, // 刪除原有的購物車商品
          create: products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
      where: { id },
      include: {
        products: {
          include: {
            product: { include: { category: true } },
          },
        },
      },
    });
  }

  async remove(id: string, user: User) {
    // 檢查是否有此購物車
    // 使用交易，避免出現部分刪除的情況
    return await this.prisma.$transaction([
      // 刪除購物車產品
      this.prisma.cartProduct.deleteMany({ where: { cartId: id } }),
      // 刪除購物車
      this.prisma.cart.delete({ where: { id, user } }),
    ]);
  }
}
