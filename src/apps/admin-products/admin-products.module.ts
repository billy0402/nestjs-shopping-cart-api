import { Module } from '@nestjs/common';

import { PrismaService } from '@/services/prisma/prisma.service';

import { AdminProductsController } from './admin-products.controller';
import { AdminProductsService } from './admin-products.service';

@Module({
  controllers: [AdminProductsController],
  providers: [AdminProductsService, PrismaService],
})
export class AdminProductsModule {}
