import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ZodSerializerDto } from 'nestjs-zod';

import { ProductOutDto } from '@/dto/product.dto';

import { PublicProductsService } from './public-products.service';

@ApiTags('public-products')
@Controller('public/products')
export class PublicProductsController {
  constructor(private readonly publicProductsService: PublicProductsService) {}

  @ApiOkResponse({ type: ProductOutDto, isArray: true })
  @ZodSerializerDto(ProductOutDto)
  @Get()
  async findAll() {
    return await this.publicProductsService.findAll();
  }

  @ApiOkResponse({ type: ProductOutDto })
  @ZodSerializerDto(ProductOutDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.publicProductsService.findOne(id);
  }
}
