import { Repository } from 'typeorm';
import { Category } from "../../entities/category.entity";
import * as data from '../../utils/data.json';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async getCategories() {
        return await this.categoryRepository.find();
    }

    async addCategories() {
        const categoriesToInsert = data.map((element) => ({
            name: element.category,
        }));

        try {

            await this.categoryRepository
                .createQueryBuilder()
                .insert()
                .into(Category)
                .values(categoriesToInsert)
                .orIgnore()
                .execute();

            return 'Categorías agregadas';
        } catch (error) {
            throw new Error(`Error al agregar categorías: ${error.message}`);
        }
    }
}
