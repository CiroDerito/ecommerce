import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileUploadService } from "./file-upload.service";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('files')
@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) { }

    @Post('/uploadImage/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(
        @Param('id') productId: string,
        @UploadedFile(new ParseFilePipe({
            validators: [new MaxFileSizeValidator({
                maxSize: 200000,
                message: 'File is too large'
            }),
            new FileTypeValidator({
                fileType: /jpg|jpge|gif|png|webp|svg/,
            }),
            ]
        }),
        ) file: Express.Multer.File) {
        return this.fileUploadService.uploadImage(file, productId)
    }
}