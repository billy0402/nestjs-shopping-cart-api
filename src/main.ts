import type { INestApplication } from '@nestjs/common';
import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

function setApiPrefix(app: INestApplication) {
  // 加上前缀 /api
  app.setGlobalPrefix('api');
  // 加上版本號 /v1
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setApiPrefix(app);
  // 設定監聽埠號 3001
  // 沒有設定 0.0.0.0 的話，下面 app.getUrl 會回傳 http://[::1]:3001
  await app.listen(3001, '0.0.0.0');
  // LOG [Bootstrap] API root url: http://127.0.0.1:3001/api/v1
  Logger.log(`API document url: ${await app.getUrl()}/api/v1`, 'Bootstrap');
}
bootstrap();
