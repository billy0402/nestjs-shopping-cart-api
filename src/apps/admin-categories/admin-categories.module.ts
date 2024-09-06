import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '@/services/prisma/prisma.service';
import { UsersService } from '@/services/users/users.service';

import { AdminCategoriesController } from './admin-categories.controller';
import { AdminCategoriesService } from './admin-categories.service';

@Module({
  imports: [JwtModule],
  controllers: [AdminCategoriesController],
  providers: [AdminCategoriesService, PrismaService, UsersService],
})
export class AdminCategoriesModule {}
