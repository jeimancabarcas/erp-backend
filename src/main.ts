import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global response wrapper → { success, status, message, data }
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  // CORS for Angular dev server
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Swagger / OpenAPI
  const config = new DocumentBuilder()
    .setTitle('ERP Backend — Inventory API')
    .setDescription('API REST para la gestión de inventario')
    .setVersion('1.0')
    .addTag('inventory-products', 'Gestión de productos de inventario')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 Server running on http://localhost:${process.env.PORT ?? 3001}`);
  console.log(`📄 Swagger docs: http://localhost:${process.env.PORT ?? 3001}/api/docs`);
}
bootstrap();
