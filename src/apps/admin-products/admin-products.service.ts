import { Injectable } from '@nestjs/common';

import { ProductInDto } from '@/dto/product.dto';
import { PrismaService } from '@/services/prisma/prisma.service';

@Injectable()
export class AdminProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async create(data: ProductInDto) {
    return await this.prisma.product.create({ data });
  }

  async update(id: string, data: ProductInDto) {
    return await this.prisma.product.update({ data, where: { id } });
  }

  async remove(id: string) {
    return await this.prisma.product.delete({ where: { id } });
  }
}
