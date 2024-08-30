import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '@/services/prisma/prisma.service';
import { UsersService } from '@/services/users/users.service';

import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';

@Module({
  imports: [JwtModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, PrismaService, UsersService],
})
export class AdminAuthModule {}
