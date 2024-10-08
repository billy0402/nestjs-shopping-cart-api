import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';

import { ENVSchema } from '@/models/env';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminAuthModule } from './apps/admin-auth/admin-auth.module';
import { AdminCategoriesModule } from './apps/admin-categories/admin-categories.module';
import { AdminOrdersModule } from './apps/admin-orders/admin-orders.module';
import { AdminProductsModule } from './apps/admin-products/admin-products.module';
import { AdminUsersModule } from './apps/admin-users/admin-users.module';
import { ClientAuthModule } from './apps/client-auth/client-auth.module';
import { ClientCartsModule } from './apps/client-carts/client-carts.module';
import { ClientOrdersModule } from './apps/client-orders/client-orders.module';
import { PublicCategoriesModule } from './apps/public-categories/public-categories.module';
import { PublicProductsModule } from './apps/public-products/public-products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => ENVSchema.parse(config),
    }),
    PublicProductsModule,
    PublicCategoriesModule,
    ClientAuthModule,
    ClientCartsModule,
    ClientOrdersModule,
    AdminAuthModule,
    AdminUsersModule,
    AdminProductsModule,
    AdminCategoriesModule,
    AdminOrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 使用 @Body 的 Dto 對 Request 進行資料驗證
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    // 使用 @ZodSerializerDto 的 Dto 對 Response 進行資料驗證
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
  ],
})
export class AppModule {}
