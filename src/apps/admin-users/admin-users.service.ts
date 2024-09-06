import { BadRequestException, Injectable } from '@nestjs/common';

import { UserInDto } from '@/dto/user.dto';
import { PrismaService } from '@/services/prisma/prisma.service';

@Injectable()
export class AdminUsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    // 檢查是否有此使用者
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException('沒有找到對應使用者');
    }

    return user;
  }

  async create(data: UserInDto) {
    return await this.prisma.user.create({ data });
  }

  async update(id: string, data: UserInDto) {
    // 檢查是否有此使用者
    await this.findOne(id);

    return await this.prisma.user.update({ data, where: { id } });
  }

  async remove(id: string) {
    // 檢查是否有此使用者
    await this.findOne(id);

    // 使用者仍有購物車或訂單時會無法刪除
    try {
      return await this.prisma.cart.deleteMany({ where: { userId: id } });
    } catch {
      throw new BadRequestException('此使用者正在被使用，無法刪除');
    }
  }
}
