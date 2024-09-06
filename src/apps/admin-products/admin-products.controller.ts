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
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Response } from 'express';
import { ZodSerializerDto } from 'nestjs-zod';

import { ProductInDto, ProductOutDto } from '@/dto/product.dto';

import { AdminProductsService } from './admin-products.service';

@ApiTags('admin-products')
@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly adminProductsService: AdminProductsService) {}

  @ApiOkResponse({ type: ProductOutDto, isArray: true })
  @ZodSerializerDto(ProductOutDto)
  @Get()
  async findAll() {
    return await this.adminProductsService.findAll();
  }

  @ApiOkResponse({ type: ProductOutDto })
  @ZodSerializerDto(ProductOutDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.adminProductsService.findOne(id);
  }

  @ApiCreatedResponse({ type: ProductOutDto })
  @ZodSerializerDto(ProductOutDto)
  @Post()
  async create(@Body() product: ProductInDto) {
    return await this.adminProductsService.create(product);
  }

  @ApiOkResponse({ type: ProductOutDto })
  @ZodSerializerDto(ProductOutDto)
  @Put(':id')
  async update(@Param('id') id: string, @Body() product: ProductInDto) {
    return await this.adminProductsService.update(id, product);
  }

  @ApiNoContentResponse()
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.adminProductsService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
