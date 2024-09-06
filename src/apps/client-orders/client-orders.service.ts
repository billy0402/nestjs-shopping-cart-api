import { BadRequestException, Injectable } from '@nestjs/common';

import { OrderInDto } from '@/dto/order.dto';
import { PrismaService } from '@/services/prisma/prisma.service';
import { OrderStatus, User } from '@prisma/client';
import { ClientCartsService } from '../client-carts/client-carts.service';

@Injectable()
export class ClientOrdersService {
  constructor(
    private prisma: PrismaService,
    private clientCartService: ClientCartsService,
  ) {}

  async findAll(user: User) {
    return await this.prisma.order.findMany({
      include: { user: true },
      where: { user },
    });
  }

  async findOne(id: string, user: User) {
    // 檢查是否有此訂單
    const order = await this.prisma.order.findUnique({
      include: { user: true },
      where: { id, user },
    });
    if (!order) {
      throw new BadRequestException('沒有找到對應訂單');
    }

    return order;
  }

  async create(data: OrderInDto, user: User) {
    // 檢查是否有此購物車
    const cart = await this.clientCartService.findOne(data.cartId, user);
    if (!cart) {
      throw new BadRequestException('沒有找到對應購物車');
    }

    // 將購物車商品轉換為訂單商品
    const products = cart.products.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ product: { categoryId, ...product }, quantity }) => ({
        ...product,
        quantity,
      }),
    );

    // 建立訂單
    const order = this.prisma.order.create({
      data: {
        userId: user.id,
        products,
        shipping: data.shipping,
        status: OrderStatus.PENDING,
      },
      include: { user: true },
    });

    // 刪除購物車
    this.clientCartService.remove(data.cartId, user);

    return order;
  }

  async cancel(id: string, user: User) {
    // 檢查是否有此訂單
    const order = await this.findOne(id, user);

    // 避免狀態跳躍或回推
    if (!this.canTransition(order.status, OrderStatus.CANCELLED)) {
      throw new BadRequestException('無法變更狀態');
    }

    return await this.prisma.order.update({
      data: { status: OrderStatus.CANCELLED },
      include: { user: true },
      where: { id, user },
    });
  }

  private canTransition(
    currentStatus: OrderStatus,
    newStatus: OrderStatus,
  ): boolean {
    const statusTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
      [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELLED]: [],
    };

    const allowedTransitions = statusTransitions[currentStatus];
    return allowedTransitions.includes(newStatus);
  }
}
