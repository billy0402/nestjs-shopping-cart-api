import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from '@prisma/client';

export const Roles = Reflector.createDecorator<Role[]>();

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 取得 Roles 裝飾器的參數，也就是允許的角色
    const roles = this.reflector.get(Roles, context.getHandler());
    // 沒有 Roles 裝飾器，則代表不需要驗證角色，會直接通過
    if (!roles) {
      return true;
    }

    // 取得當前的 Request 物件
    const request = context.switchToHttp().getRequest();
    // request.user 是從 AuthGuard 加入的
    const user = request.user;
    // 比對使用者的角色是否在允許的角色中
    return this.matchRoles(roles, user?.role);
  }

  private matchRoles(roles: string[], userRole: Role): boolean {
    return roles.some((role) => role === userRole);
  }
}
