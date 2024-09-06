import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '@/services/prisma/prisma.service';
import { UsersService } from '@/services/users/users.service';

import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';

@Module({
  imports: [JwtModule],
  controllers: [AdminUsersController],
  providers: [AdminUsersService, PrismaService, UsersService],
})
export class AdminUsersModule {}
