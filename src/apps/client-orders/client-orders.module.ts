import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ClientCartsService } from '@/apps/client-carts/client-carts.service';
import { PrismaService } from '@/services/prisma/prisma.service';
import { UsersService } from '@/services/users/users.service';

import { ClientOrdersController } from './client-orders.controller';
import { ClientOrdersService } from './client-orders.service';

@Module({
  imports: [JwtModule],
  controllers: [ClientOrdersController],
  providers: [
    ClientOrdersService,
    PrismaService,
    UsersService,
    ClientCartsService,
  ],
})
export class ClientOrdersModule {}
