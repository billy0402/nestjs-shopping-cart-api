import { BadRequestException, Injectable } from '@nestjs/common';

import { ProductInDto } from '@/dto/product.dto';
import { PrismaService } from '@/services/prisma/prisma.service';

@Injectable()
export class AdminProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.product.findMany({
      include: { category: true },
    });
  }

  async findOne(id: string) {
    // 檢查是否有此產品
    const product = await this.prisma.product.findUnique({
      include: { category: true },
      where: { id },
    });
    if (!product) {
      throw new BadRequestException('沒有找到對應產品');
    }

    return product;
  }

  async create(data: ProductInDto) {
    // 檢查是否有此分類
    const category = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      throw new BadRequestException('沒有找到對應分類');
    }

    return await this.prisma.product.create({
      data,
      include: { category: true },
    });
  }

  async update(id: string, data: ProductInDto) {
    // 檢查是否有此產品
    await this.findOne(id);

    // 檢查是否有此分類
    const category = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      throw new BadRequestException('沒有找到對應分類');
    }

    return await this.prisma.product.update({
      data,
      include: { category: true },
      where: { id },
    });
  }

  async remove(id: string) {
    // 檢查是否有此產品
    await this.findOne(id);

    // 檢查此產品是否已被購買，只需要檢查購物車，訂單是直接拷貝一份，不會受到引響
    const carts = await this.prisma.cart.findMany({
      where: { products: { some: { productId: id } } },
    });
    if (carts.length > 0) {
      throw new BadRequestException('此產品已被購買，無法刪除');
    }

    return await this.prisma.product.delete({ where: { id } });
  }
}
