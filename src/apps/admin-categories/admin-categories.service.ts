import { BadRequestException, Injectable } from '@nestjs/common';

import { CategoryInDto } from '@/dto/category.dto';
import { PrismaService } from '@/services/prisma/prisma.service';

@Injectable()
export class AdminCategoriesService {
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

  async create(data: CategoryInDto) {
    return await this.prisma.category.create({ data });
  }

  async update(id: string, data: CategoryInDto) {
    // 檢查是否有此類別
    await this.findOne(id);

    return await this.prisma.category.update({ data, where: { id } });
  }

  async remove(id: string) {
    // 檢查是否有此類別
    await this.findOne(id);

    // 檢查是否有產品使用此類別
    const productCount = await this.prisma.product.count({
      where: { categoryId: id },
    });
    if (productCount > 0) {
      throw new BadRequestException('有產品使用此類別');
    }

    return await this.prisma.category.delete({ where: { id } });
  }
}
