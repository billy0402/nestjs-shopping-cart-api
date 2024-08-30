import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Role } from '@prisma/client';
import { ZodSerializerDto } from 'nestjs-zod';

import {
  LoginInDto,
  RefreshInDto,
  RegisterAdminInDto,
  TokenPayloadDto,
  UserInfoDto,
} from '@/dto/auth.dto';
import { AuthGuard } from '@/guards/auth/auth.guard';
import { Roles, RolesGuard } from '@/guards/roles/roles.guard';
import { UsersService } from '@/services/users/users.service';

import { AdminAuthService } from './admin-auth.service';

@ApiTags('admin-auth')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(
    private readonly adminAuthService: AdminAuthService,
    private userService: UsersService,
  ) {}

  @ApiOkResponse({ type: TokenPayloadDto })
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(TokenPayloadDto)
  @Post('login')
  async login(@Body() data: LoginInDto) {
    return await this.adminAuthService.login(data);
  }

  @ApiOkResponse({ type: TokenPayloadDto })
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(TokenPayloadDto)
  @Post('refresh')
  async refresh(@Body() data: RefreshInDto) {
    return await this.adminAuthService.refresh(data.refreshToken);
  }

  @ApiCreatedResponse({ type: UserInfoDto })
  @ZodSerializerDto(UserInfoDto)
  @Post('register')
  async register(@Body() data: RegisterAdminInDto) {
    return await this.userService.create(data);
  }

  @ApiOkResponse({ type: UserInfoDto })
  @ZodSerializerDto(UserInfoDto)
  @Roles([Role.ADMIN])
  @UseGuards(AuthGuard, RolesGuard)
  @Get('me')
  me(@Request() request) {
    return request.user;
  }
}
