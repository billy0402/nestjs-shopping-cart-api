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

import { CategoryInDto, CategoryOutDto } from '@/dto/category.dto';
import { AuthGuard } from '@/guards/auth/auth.guard';
import { Roles, RolesGuard } from '@/guards/roles/roles.guard';

import { AdminCategoriesService } from './admin-categories.service';

@ApiTags('admin-categories')
@Roles([Role.ADMIN])
@UseGuards(AuthGuard, RolesGuard)
@Controller('admin/categories')
export class AdminCategoriesController {
  constructor(
    private readonly adminCategoriesService: AdminCategoriesService,
  ) {}

  @ApiOkResponse({ type: CategoryOutDto, isArray: true })
  @ZodSerializerDto(CategoryOutDto)
  @Get()
  async findAll() {
    return await this.adminCategoriesService.findAll();
  }

  @ApiOkResponse({ type: CategoryOutDto })
  @ZodSerializerDto(CategoryOutDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.adminCategoriesService.findOne(id);
  }

  @ApiCreatedResponse({ type: CategoryOutDto })
  @ZodSerializerDto(CategoryOutDto)
  @Post()
  async create(@Body() category: CategoryInDto) {
    return await this.adminCategoriesService.create(category);
  }

  @ApiOkResponse({ type: CategoryOutDto })
  @ZodSerializerDto(CategoryOutDto)
  @Put(':id')
  async update(@Param('id') id: string, @Body() category: CategoryInDto) {
    return await this.adminCategoriesService.update(id, category);
  }

  @ApiNoContentResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.adminCategoriesService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
