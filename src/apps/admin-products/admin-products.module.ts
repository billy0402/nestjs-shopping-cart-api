import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '@/services/prisma/prisma.service';
import { UsersService } from '@/services/users/users.service';

import { AdminProductsController } from './admin-products.controller';
import { AdminProductsService } from './admin-products.service';

@Module({
  imports: [JwtModule],
  controllers: [AdminProductsController],
  providers: [AdminProductsService, PrismaService, UsersService],
})
export class AdminProductsModule {}
