import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ZodSerializerDto } from 'nestjs-zod';

import { OrderInDto, OrderOutDto } from '@/dto/order.dto';
import { AuthGuard } from '@/guards/auth/auth.guard';

import { ClientOrdersService } from './client-orders.service';

@ApiTags('client-orders')
@UseGuards(AuthGuard)
@Controller('client/orders')
export class ClientOrdersController {
  constructor(private readonly clientOrdersService: ClientOrdersService) {}

  @ApiOkResponse({ type: OrderOutDto, isArray: true })
  @ZodSerializerDto(OrderOutDto)
  @Get()
  async findAll(@Req() req) {
    return await this.clientOrdersService.findAll(req.user);
  }

  @ApiOkResponse({ type: OrderOutDto })
  @ZodSerializerDto(OrderOutDto)
  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    return await this.clientOrdersService.findOne(id, req.user);
  }

  @ApiOkResponse({ type: OrderOutDto })
  @ZodSerializerDto(OrderOutDto)
  @Post()
  async create(@Req() req, @Body() order: OrderInDto) {
    return await this.clientOrdersService.create(order, req.user);
  }

  @ApiOkResponse({ type: OrderOutDto })
  @ZodSerializerDto(OrderOutDto)
  @Post(':id/cancel')
  async cancel(@Req() req, @Param('id') id: string) {
    return await this.clientOrdersService.cancel(id, req.user);
  }
}
