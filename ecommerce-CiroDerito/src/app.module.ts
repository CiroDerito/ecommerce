import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { ProductModule } from './modules/products/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm'
import { OrderModule } from './modules/order/order.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './modules/users/user.repository';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm')
    }),
    UserModule,
    ProductModule,
    AuthModule,
    CategoriesModule,
    OrderModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h'
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository],
})
export class AppModule { }
