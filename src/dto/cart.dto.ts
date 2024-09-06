import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CartInSchema = z.object({
  products: z
    .object({
      productId: z.string().min(1),
      quantity: z.number().int().min(1),
    })
    .array(),
});
export class CartInDto extends createZodDto(CartInSchema) {}

export const CartOutSchema = z.object({
  id: z.string().min(1),
  products: z
    .object({
      product: z.object({
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
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
      quantity: z.number().int().min(1),
    })
    .array(),
});
export class CartOutDto extends createZodDto(CartOutSchema) {}
