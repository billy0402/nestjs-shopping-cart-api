import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Role } from '@prisma/client';
import { Response } from 'express';
import { ZodSerializerDto } from 'nestjs-zod';

import { UserInDto, UserOutDto } from '@/dto/user.dto';
import { AuthGuard } from '@/guards/auth/auth.guard';
import { Roles, RolesGuard } from '@/guards/roles/roles.guard';

import { AdminUsersService } from './admin-users.service';

@ApiTags('admin-users')
@Roles([Role.ADMIN])
@UseGuards(AuthGuard, RolesGuard)
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @ApiOkResponse({ type: UserOutDto, isArray: true })
  @ZodSerializerDto(UserOutDto)
  @Get()
  async findAll() {
    return await this.adminUsersService.findAll();
  }

  @ApiOkResponse({ type: UserOutDto })
  @ZodSerializerDto(UserOutDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.adminUsersService.findOne(id);
  }

  @ApiCreatedResponse({ type: UserOutDto })
  @ZodSerializerDto(UserOutDto)
  @Post()
  async create(@Body() user: UserInDto) {
    return await this.adminUsersService.create(user);
  }

  @ApiOkResponse({ type: UserOutDto })
  @ZodSerializerDto(UserOutDto)
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UserInDto) {
    return await this.adminUsersService.update(id, user);
  }

  @ApiNoContentResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.adminUsersService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
