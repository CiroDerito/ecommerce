import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from "../../entities/category.entity";
import { CategoriesService } from './category.service';
import { CategoriesController } from './category.controller';
import { CategoriesRepository } from './category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
  exports: [CategoriesService, CategoriesRepository]
})
export class CategoriesModule { }
