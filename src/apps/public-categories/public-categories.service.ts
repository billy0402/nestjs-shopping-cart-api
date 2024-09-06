import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/services/prisma/prisma.service';

@Injectable()
export class PublicCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string) {
    // 檢查是否有此類別
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new BadRequestException('沒有找到對應類別');
    }

    return category;
  }
}
