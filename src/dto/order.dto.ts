import { OrderStatus, Role } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const OrderInSchema = z.object({
  cartId: z.string().min(1),
  shipping: z.number().int().min(0),
});
export class OrderInDto extends createZodDto(OrderInSchema) {}

export const OrderOutSchema = z.object({
  id: z.string().min(1),
  user: z.object({
    id: z.string().min(1),
    email: z.string().email().min(1),
    name: z.string().min(1),
    role: z.nativeEnum(Role),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  products: z
    .object({
      id: z.string().min(1),
      name: z.string(),
      description: z.string().nullish().default(null),
      category: z.object({
        id: z.string().min(1),
        name: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
      price: z.number().int(),
      image: z.string().url().nullish().or(z.literal('')),
      rating: z.object({
        rate: z.number().default(5.0),
        count: z.number().int().default(0),
      }),
      quantity: z.number().int().min(1),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .array(),
  shipping: z.number().int().min(0),
  status: z.nativeEnum(OrderStatus),
});
export class OrderOutDto extends createZodDto(OrderOutSchema) {}

export const OrderStatusInSchema = z.object({
  status: z.nativeEnum(OrderStatus),
});
export class OrderStatusInDto extends createZodDto(OrderStatusInSchema) {}
