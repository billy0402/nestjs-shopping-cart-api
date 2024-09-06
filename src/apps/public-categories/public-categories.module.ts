import { Module } from '@nestjs/common';

import { PrismaService } from '@/services/prisma/prisma.service';

import { PublicCategoriesController } from './public-categories.controller';
import { PublicCategoriesService } from './public-categories.service';

@Module({
  controllers: [PublicCategoriesController],
  providers: [PublicCategoriesService, PrismaService],
})
export class PublicCategoriesModule {}
