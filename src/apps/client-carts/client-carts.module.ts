import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '@/services/prisma/prisma.service';
import { UsersService } from '@/services/users/users.service';

import { ClientCartsController } from './client-carts.controller';
import { ClientCartsService } from './client-carts.service';

@Module({
  imports: [JwtModule],
  controllers: [ClientCartsController],
  providers: [ClientCartsService, PrismaService, UsersService],
})
export class ClientCartsModule {}
