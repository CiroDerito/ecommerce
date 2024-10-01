import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../../entities/product.entity";
import { Category } from "../../entities/category.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    exports: [ProductService, ProductRepository]
})
export class ProductModule { }
