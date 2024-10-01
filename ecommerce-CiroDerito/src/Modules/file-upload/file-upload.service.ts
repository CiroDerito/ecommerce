import { Injectable, NotFoundException } from "@nestjs/common";
import { FileUploadRepository } from "./file-upload.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class FileUploadService {
    constructor(private readonly fileUploadRepository: FileUploadRepository, @InjectRepository(Product) private readonly productRepository: Repository<Product>) { }

    async uploadImage(file: Express.Multer.File, productId: string) {
        const product = await this.productRepository.findOneBy({ id: productId })

        if (!product) throw new NotFoundException(`Product ${productId} not found`)

        const uploadedImage = await this.fileUploadRepository.uploadImage(file)

        await this.productRepository.update(productId, { imgUrl: uploadedImage.secure_url });

        const findUpdatedProduct = await this.productRepository.findOneBy({ id: productId })

        return findUpdatedProduct;
    }
}