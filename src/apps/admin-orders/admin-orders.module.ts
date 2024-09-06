import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '@/services/prisma/prisma.service';
import { UsersService } from '@/services/users/users.service';

import { AdminOrdersController } from './admin-orders.controller';
import { AdminOrdersService } from './admin-orders.service';

@Module({
  imports: [JwtModule],
  controllers: [AdminOrdersController],
  providers: [AdminOrdersService, PrismaService, UsersService],
})
export class AdminOrdersModule {}
