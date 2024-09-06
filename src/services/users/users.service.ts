import { BadRequestException, Injectable } from '@nestjs/common';

import { RegisterInDto } from '@/dto/auth.dto';
import { PrismaService } from '@/services/prisma/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: RegisterInDto) {
    const { email, password } = data;

    // 檢查 Email 是否已經被註冊
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('此信箱已經被註冊');
    }

    // 加密密碼
    const hashedPassword = await hash(password, 10);

    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }
}
