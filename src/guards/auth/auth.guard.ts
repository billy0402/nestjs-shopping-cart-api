import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

import { UsersService } from '@/services/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // 檢查 Header 中是否有 Access Token
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    // 驗證 Access Token 是否有效
    let payload;
    try {
      const accessSecret = this.configService.get('ACCESS_TOKEN_SECRET');
      payload = this.jwtService.verify(token, { secret: accessSecret });
    } catch {
      throw new UnauthorizedException('Token 無效或已過期');
    }

    // 把 User 加入 Request 物件中
    const user = await this.userService.findOne(payload.userId);
    request.user = user;
    return true;
  }

  // 放入 Header 的 Access Token 會長這樣: Bearer <accessToken>
  // 把 <accessToken> 的部分切出來
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
