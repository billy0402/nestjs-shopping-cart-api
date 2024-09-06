import { Role } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UserInSchema = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    name: z.string().min(1),
    role: z.nativeEnum(Role).default(Role.USER),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .transform(({ confirmPassword, ...data }) => data);
export class UserInDto extends createZodDto(UserInSchema) {}

export const UserOutSchema = z.object({
  id: z.string().min(1),
  email: z.string().email().min(1),
  name: z.string().min(1),
  role: z.nativeEnum(Role),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export class UserOutDto extends createZodDto(UserOutSchema) {}
