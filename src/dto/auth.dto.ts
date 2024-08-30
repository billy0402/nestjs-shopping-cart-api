import { Role } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Login
export const LoginInSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6),
});
export class LoginInDto extends createZodDto(LoginInSchema) {}

export const TokenPayloadSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});
export class TokenPayloadDto extends createZodDto(TokenPayloadSchema) {}

// Refresh
export const RefreshInSchema = z.object({
  refreshToken: z.string().min(1),
});
export class RefreshInDto extends createZodDto(RefreshInSchema) {}

// Register
export const RegisterInSchema = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    name: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .transform(({ confirmPassword, ...data }) => data);
export class RegisterInDto extends createZodDto(RegisterInSchema) {}

export const RegisterAdminInSchema = z
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
export class RegisterAdminInDto extends createZodDto(RegisterAdminInSchema) {}

// Me
export const UserInfoSchema = z.object({
  id: z.string().min(1),
  email: z.string().email().min(1),
  name: z.string().min(1),
  role: z.nativeEnum(Role),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export class UserInfoDto extends createZodDto(UserInfoSchema) {}
