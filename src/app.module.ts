import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminProductsModule } from './apps/admin-products/admin-products.module';

@Module({
  imports: [AdminProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
