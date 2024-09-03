import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdminProductsService } from './admin-products.service';
import { CreateAdminProductDto } from './dto/create-admin-product.dto';
import { UpdateAdminProductDto } from './dto/update-admin-product.dto';

@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly adminProductsService: AdminProductsService) {}

  @Post()
  create(@Body() createAdminProductDto: CreateAdminProductDto) {
    return this.adminProductsService.create(createAdminProductDto);
  }

  @Get()
  findAll() {
    return this.adminProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminProductsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminProductDto: UpdateAdminProductDto,
  ) {
    return this.adminProductsService.update(+id, updateAdminProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminProductsService.remove(+id);
  }
}
