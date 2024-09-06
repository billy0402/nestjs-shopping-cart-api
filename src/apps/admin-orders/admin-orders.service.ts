import { BadRequestException, Injectable } from '@nestjs/common';

import { OrderStatusInDto } from '@/dto/order.dto';
import { PrismaService } from '@/services/prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class AdminOrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.order.findMany({
      include: { user: true },
    });
  }

  async findOne(id: string) {
    // 檢查是否有此訂單
    const order = await this.prisma.order.findUnique({
      include: { user: true },
      where: { id },
    });
    if (!order) {
      throw new BadRequestException('沒有找到對應訂單');
    }

    return order;
  }

  async updateStatus(id: string, data: OrderStatusInDto) {
    // 檢查是否有此訂單
    const order = await this.findOne(id);

    // 避免狀態跳躍或回推
    if (!this.canTransition(order.status, data.status)) {
      throw new BadRequestException('無法變更狀態');
    }

    return await this.prisma.order.update({
      data,
      include: { user: true },
      where: { id },
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
