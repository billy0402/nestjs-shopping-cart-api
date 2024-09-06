import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CategoryInSchema = z.object({
  name: z.string(),
});
export class CategoryInDto extends createZodDto(CategoryInSchema) {}

export const CategoryOutSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export class CategoryOutDto extends createZodDto(CategoryOutSchema) {}
