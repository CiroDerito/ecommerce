import { Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get('seeder')
    addCategories() {
        return this.categoriesService.addCategories();
    }

    @Get()
    getCategories() {
        return this.categoriesService.getCategories()
    }
}
