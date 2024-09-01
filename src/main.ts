import { Logger, VersioningType, type INestApplication } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { patchNestJsSwagger } from 'nestjs-zod';

import { AppModule } from './app.module';
import { ZodExceptionsFilter } from './filters/zod-exceptions/zod-exceptions.filter';

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

  // 添加補丁，根據 zod 的 schema 生成 swagger 的 schema
  patchNestJsSwagger();

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

  // 捕捉 Zod 錯誤
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ZodExceptionsFilter(httpAdapter));

  setupSwagger(app);

  // 設定 CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
  });

  // 設定監聽埠號 3001
  // 沒有設定 0.0.0.0 的話，下面 app.getUrl 會回傳 http://[::1]:3001
  await app.listen(3001, '0.0.0.0');
  // LOG [Bootstrap] API document url: http://127.0.0.1:3001/api/docs
  Logger.log(`API document url: ${await app.getUrl()}/api/docs`, 'Bootstrap');
}
bootstrap();
