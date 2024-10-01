import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { Product } from "../../entities/product.entity";

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository) { }

    getProducts(page: number = 1, limit: number = 5) {
        return this.productRepository.getProducts(page, limit);
    }

    getProductById(id: string) {
        return this.productRepository.getId(id);
    }

    addProducts() {
        return this.productRepository.addProducts()
    }

    updateProduct(id: string, product) {
        return this.productRepository.updateProduct(id, product)
    }

    // createProduct(product: Product) {
    //     return this.productRepository.createProduct(product);
    // }

    // async updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
    //     const product = await this.productRepository.findOne(id);
    //     if (!product) {
    //         return null;
    //     }

    //     const updatedProduct = { ...product, ...productData };
    //     return this.productRepository.save(updatedProduct);
    // }

    //     async deleteProduct(id: number): Promise<Product | null> {
    //         const product = await this.productRepository.findOne(id);
    //         if (!product) {
    //             return null;
    //         }

    //         await this.productRepository.delete(id);
    //         return product;
    //     }
}
