import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Role } from '@prisma/client';
import { ZodSerializerDto } from 'nestjs-zod';

import { OrderOutDto, OrderStatusInDto } from '@/dto/order.dto';
import { AuthGuard } from '@/guards/auth/auth.guard';
import { Roles, RolesGuard } from '@/guards/roles/roles.guard';

import { AdminOrdersService } from './admin-orders.service';

@ApiTags('admin-orders')
@Roles([Role.ADMIN])
@UseGuards(AuthGuard, RolesGuard)
@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private readonly adminOrdersService: AdminOrdersService) {}

  @ApiOkResponse({ type: OrderOutDto, isArray: true })
  @ZodSerializerDto(OrderOutDto)
  @Get()
  async findAll() {
    return await this.adminOrdersService.findAll();
  }

  @ApiOkResponse({ type: OrderOutDto })
  @ZodSerializerDto(OrderOutDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.adminOrdersService.findOne(id);
  }

  @ApiOkResponse({ type: OrderOutDto })
  @ZodSerializerDto(OrderOutDto)
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() data: OrderStatusInDto) {
    return await this.adminOrdersService.updateStatus(id, data);
  }
}
