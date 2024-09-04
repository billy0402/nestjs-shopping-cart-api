import type { INestApplication } from '@nestjs/common';
import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

function setApiPrefix(app: INestApplication) {
  // 加上前缀 /api
  app.setGlobalPrefix('api');
  // 加上版本號 /v1
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Shopping Cart API')
    .setDescription('A RESTful API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // 生成 schema.json 和 schema.yaml，可以供其他工具使用
  SwaggerModule.setup('/api/docs', app, document, {
    jsonDocumentUrl: '/api/schema.json',
    yamlDocumentUrl: '/api/schema.yaml',
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setApiPrefix(app);
  setupSwagger(app);
  // 設定監聽埠號 3001
  // 沒有設定 0.0.0.0 的話，下面 app.getUrl 會回傳 http://[::1]:3001
  await app.listen(3001, '0.0.0.0');
  // LOG [Bootstrap] API document url: http://127.0.0.1:3001/api/docs
  Logger.log(`API document url: ${await app.getUrl()}/api/docs`, 'Bootstrap');
}
bootstrap();
