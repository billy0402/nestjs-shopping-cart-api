import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '@/services/prisma/prisma.service';
import { UsersService } from '@/services/users/users.service';

import { ClientAuthController } from './client-auth.controller';
import { ClientAuthService } from './client-auth.service';

@Module({
  imports: [JwtModule],
  controllers: [ClientAuthController],
  providers: [ClientAuthService, PrismaService, UsersService],
})
export class ClientAuthModule {}
