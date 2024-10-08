import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ProductInSchema = z.object({
  name: z.string(),
  description: z.string().nullish().default(null),
  categoryId: z.string(),
  price: z.number().int(),
  image: z.string().url().nullish().or(z.literal('')),
  rating: z
    .object({
      rate: z.number(),
      count: z.number().int(),
    })
    .default({ rate: 5, count: 0 }),
});
export class ProductInDto extends createZodDto(ProductInSchema) {}

export const ProductOutSchema = z.object({
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
});
export class ProductOutDto extends createZodDto(ProductOutSchema) {}
