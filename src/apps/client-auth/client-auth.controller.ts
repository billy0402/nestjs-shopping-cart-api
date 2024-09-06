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

import { ZodSerializerDto } from 'nestjs-zod';

import {
  LoginInDto,
  RefreshInDto,
  RegisterInDto,
  TokenPayloadDto,
  UserInfoDto,
} from '@/dto/auth.dto';
import { AuthGuard } from '@/guards/auth/auth.guard';
import { UsersService } from '@/services/users/users.service';

import { ClientAuthService } from './client-auth.service';

@ApiTags('client-auth')
@Controller('client/auth')
export class ClientAuthController {
  constructor(
    private readonly clientAuthService: ClientAuthService,
    private userService: UsersService,
  ) {}

  @ApiOkResponse({ type: TokenPayloadDto })
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(TokenPayloadDto)
  @Post('login')
  async login(@Body() data: LoginInDto) {
    return await this.clientAuthService.login(data);
  }

  @ApiOkResponse({ type: TokenPayloadDto })
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(TokenPayloadDto)
  @Post('refresh')
  async refresh(@Body() data: RefreshInDto) {
    return await this.clientAuthService.refresh(data.refreshToken);
  }

  @ApiCreatedResponse({ type: UserInfoDto })
  @ZodSerializerDto(UserInfoDto)
  @Post('register')
  async register(@Body() data: RegisterInDto) {
    return await this.userService.create(data);
  }

  @ApiOkResponse({ type: UserInfoDto })
  @ZodSerializerDto(UserInfoDto)
  @UseGuards(AuthGuard)
  @Get('me')
  me(@Request() request) {
    return request.user;
  }
}
