import { Module } from '@nestjs/common';

import { PrismaService } from '@/services/prisma/prisma.service';

import { PublicProductsController } from './public-products.controller';
import { PublicProductsService } from './public-products.service';

@Module({
  controllers: [PublicProductsController],
  providers: [PublicProductsService, PrismaService],
})
export class PublicProductsModule {}
