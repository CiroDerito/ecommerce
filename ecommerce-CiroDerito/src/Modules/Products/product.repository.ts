import { Injectable } from "@nestjs/common";
import { Product } from "../../entities/product.entity";
import * as data from '../../utils/data.json'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../../entities/category.entity";

@Injectable()
export class ProductRepository {
    products: any;
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>
    ) { }

    async getProducts(page: number, limit: number): Promise<Product[]> {
        let products = await this.productRepository.find({
            relations: {
                category: true,
            },
        });
        const start = (page - 1) * limit;
        const end = start + limit
        products = products.slice(start, end);
        return products
    }

    async getId(id: string) {
        const product = await this.productRepository.findOneBy({ id })
        if (!product) {
            return `Producto de id ${id} no encontrado`
        }
        return product
    }

    async addProducts() {
        const categories = this.categoriesRepository.find()
        data?.map(async (element) => {
            const category = (await categories).find(
                (category) => category.name === element.category,);
            const product = new Product();

            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.imgUrl = element.imgUrl;
            product.stock = element.stock;
            product.category = category;

            await this.productRepository
                .createQueryBuilder()
                .insert()
                .into(Product)
                .values(product)
                .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                .execute()
        });
        return 'Productos agregados'
    }

    async updateProduct(id: string, product: Product) {
        await this.productRepository.update(id, product);
        const updatedProduct = await this.productRepository.findOneBy({ id })
        return updatedProduct
    }

    // async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    //     const newProduct: Product = { ...product, id: String(this.products.length + 1) };
    //     this.products.push(newProduct);
    //     return newProduct;
    // }

    async save(product: Product): Promise<Product> {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index >= 0) {
            this.products[index] = product;
        }
        return product;
    }

    // async delete(id: number): Promise<void> {
    //     this.products = this.products.filter(product => product.id !== id.toString());
    // }

    async findOne(id: number): Promise<Product | null> {
        return this.products.find(product => product.id === id.toString()) || null;
    }
}
