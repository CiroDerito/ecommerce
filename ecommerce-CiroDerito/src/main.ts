import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLoggerMiddleware } from './middlewares/logger.middleware';
import { CategoriesService } from './modules/category/category.service';
import { ProductService } from './modules/products/product.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(globalLoggerMiddleware);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  //precargas
  const categoriesService = app.get(CategoriesService);
  const productsService = app.get(ProductService);
  await categoriesService.addCategories();
  await productsService.addProducts();
  //swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription('API de e-commerce desarrollado con NestJS que permite la gestión de usuarios con roles (administradores y usuarios). Incluye una precarga de datos con categorías y productos, y ofrece un CRUD completo para gestionar usuarios, productos y categorías. Ideal para gestionar las operaciones de una tienda en línea.')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
