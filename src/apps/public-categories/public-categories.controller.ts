import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ZodSerializerDto } from 'nestjs-zod';

import { CategoryOutDto } from '@/dto/category.dto';

import { PublicCategoriesService } from './public-categories.service';

@ApiTags('public-categories')
@Controller('public/categories')
export class PublicCategoriesController {
  constructor(
    private readonly publicCategoriesService: PublicCategoriesService,
  ) {}

  @ApiOkResponse({ type: CategoryOutDto, isArray: true })
  @ZodSerializerDto(CategoryOutDto)
  @Get()
  async findAll() {
    return await this.publicCategoriesService.findAll();
  }

  @ApiOkResponse({ type: CategoryOutDto })
  @ZodSerializerDto(CategoryOutDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.publicCategoriesService.findOne(id);
  }
}
