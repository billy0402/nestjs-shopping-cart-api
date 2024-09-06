import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Response } from 'express';
import { ZodSerializerDto } from 'nestjs-zod';

import { CartInDto, CartOutDto } from '@/dto/cart.dto';
import { AuthGuard } from '@/guards/auth/auth.guard';

import { ClientCartsService } from './client-carts.service';

@ApiTags('client-carts')
@UseGuards(AuthGuard)
@Controller('client/carts')
export class ClientCartsController {
  constructor(private readonly clientCartsService: ClientCartsService) {}

  @ApiOkResponse({ type: CartOutDto, isArray: true })
  @ZodSerializerDto(CartOutDto)
  @Get()
  async findAll(@Req() req) {
    return await this.clientCartsService.findAll(req.user);
  }

  @ApiOkResponse({ type: CartOutDto })
  @ZodSerializerDto(CartOutDto)
  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    return await this.clientCartsService.findOne(id, req.user);
  }

  @ApiCreatedResponse({ type: CartOutDto })
  @ZodSerializerDto(CartOutDto)
  @Post()
  async create(@Req() req, @Body() cart: CartInDto) {
    return await this.clientCartsService.create(cart, req.user);
  }

  @ApiOkResponse({ type: CartOutDto })
  @ZodSerializerDto(CartOutDto)
  @Put(':id')
  async update(@Req() req, @Param('id') id: string, @Body() cart: CartInDto) {
    return await this.clientCartsService.update(id, cart, req.user);
  }

  @ApiNoContentResponse()
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string, @Res() res: Response) {
    await this.clientCartsService.remove(id, req.user);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
