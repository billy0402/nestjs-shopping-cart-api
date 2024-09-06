import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/prisma/prisma.service';

@Injectable()
export class PublicProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string) {
    // 檢查是否有此產品
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new BadRequestException('沒有找到對應產品');
    }

    return product;
  }
}
