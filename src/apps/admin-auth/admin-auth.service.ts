import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcryptjs';

import { LoginInDto } from '@/dto/auth.dto';
import { ENV } from '@/models/env';
import { UsersService } from '@/services/users/users.service';

@Injectable()
export class AdminAuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService<ENV>,
  ) {}

  async login(data: LoginInDto) {
    const { email, password } = data;

    // 檢查使用者是否存在
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('使用者不存在');
    }

    // 檢查密碼是否正確
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('密碼錯誤');
    }

    // 產生 Access Token 和 Refresh Token
    const payload = { userId: user.id };
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  refresh(refreshToken: string) {
    // 驗證 Refresh Token 是否有效
    let payload;
    try {
      const refreshSecret = this.configService.get('REFRESH_TOKEN_SECRET');
      payload = this.jwtService.verify(refreshToken, { secret: refreshSecret });
    } catch {
      throw new UnauthorizedException('Token 無效或已過期');
    }

    // 產生 Access Token 和 Refresh Token
    const newPayload = { userId: payload.userId };
    const newAccessToken = this.generateAccessToken(newPayload);
    const newRefreshToken = this.generateRefreshToken(newPayload);
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  private generateAccessToken(payload: { userId: string }) {
    const secret = this.configService.get('ACCESS_TOKEN_SECRET');
    const expiresIn = this.configService.get('ACCESS_TOKEN_LIFETIME');
    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  private generateRefreshToken(payload: { userId: string }) {
    const secret = this.configService.get('REFRESH_TOKEN_SECRET');
    const expiresIn = this.configService.get('REFRESH_TOKEN_LIFETIME');
    return this.jwtService.sign(payload, { secret, expiresIn });
  }
}
