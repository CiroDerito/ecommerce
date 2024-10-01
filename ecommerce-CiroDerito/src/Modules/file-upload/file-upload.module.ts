import { Module } from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { FileUploadRepository } from "./file-upload.repository";
import { FileUploadController } from "./file-upload.controller";
import { CloudinaryConfig } from "src/config/cloudinary";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [FileUploadController],
    providers: [FileUploadService, FileUploadRepository, CloudinaryConfig]
})
export class FileUploadModule {

}