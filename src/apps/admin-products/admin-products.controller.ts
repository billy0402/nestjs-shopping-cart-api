import {
  BadRequestException,
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

import { Response } from 'express';

import {
  ProductInDto,
  ProductInSchema,
  ProductOutSchema,
} from '@/dto/product.dto';

import { AdminProductsService } from './admin-products.service';

@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly adminProductsService: AdminProductsService) {}

  @Get()
  async findAll() {
    const products = await this.adminProductsService.findAll();
    return ProductOutSchema.array().parse(products);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.adminProductsService.findOne(id);
    return ProductOutSchema.parse(product);
  }

  @Post()
  async create(@Body() product: ProductInDto) {
    const parsed = ProductInSchema.safeParse(product);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.errors);
    }

    const createdProduct = await this.adminProductsService.create(parsed.data);
    return ProductOutSchema.parse(createdProduct);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: ProductInDto) {
    const parsed = ProductInSchema.safeParse(product);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.errors);
    }

    const updatedProduct = await this.adminProductsService.update(
      id,
      parsed.data,
    );
    return ProductOutSchema.parse(updatedProduct);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.adminProductsService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
