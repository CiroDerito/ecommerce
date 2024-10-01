import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Response } from "express";
import { AuthGuard } from "../auth/auth.guard";
import { RoleGuard } from "../auth/role.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UpdateProductDto } from "src/dtos/updateProduct.dto";

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @HttpCode(200)
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @Get()
    async getProducts(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5
    ) {
        const pageNumber = page > 0 ? page : 1;
        const limitNumber = limit > 0 ? limit : 5;
        if (isNaN(pageNumber) || isNaN(limitNumber)) {
            throw new BadRequestException('Los parámetros de página y límite deben ser números válidos.');
        }

        const products = await this.productService.getProducts(pageNumber, limitNumber);

        return { page: pageNumber, limit: limitNumber, data: products };
    }

    @Put(':id')
    @Roles(Role.Admin)
    @ApiBearerAuth()
    @ApiBody({ type: UpdateProductDto })
    @UseGuards(AuthGuard, RoleGuard)
    async updateProduct(@Body() product, @Param('id', ParseUUIDPipe) id: string) {
        const productEdited = await this.productService.updateProduct(id, product)
        try {
            if (!productEdited) {
                return new NotFoundException(`No existe el producto con id:${id}`)
            }
            return productEdited
        } catch (error) {
            throw new BadRequestException('Error en la solicitud.')
        }
    }

    @Get('seeder')
    addProduct() {
        return this.productService.addProducts();
    }

    @Get(':id')
    async getProductById(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
        const product = await this.productService.getProductById(id);
        try {

            if (!product) {
                return new NotFoundException('No existe el producto');
            }

            return res.status(200).json(product);
        } catch (error) {
            throw new NotFoundException
        }
    }

    // @Post()
    // @UseGuards(AuthGuard)
    // async createProduct(@Body() product: Product, @Res() res: Response) {
    //     if (!product.name || !product.description || !product.price || !product.stock || !product.imgUrl) {
    //         return res.status(400).send('Error en los datos de la solicitud');
    //     }

    //     const newProduct = await this.productService.createProduct(product);
    //     return res.status(201).json(newProduct);
    // }

    // @Put(':id')
    // @UseGuards(AuthGuard)
    // async updateProduct(@Param('id') id: string, @Body() productData: Partial<Product>, @Res() res: Response) {
    //     const productId = Number(id);
    //     if (isNaN(productId)) {
    //         return res.status(400).send('ID no válido');
    //     }

    //     const updatedProduct = await this.productService.updateProduct(id, product);
    //     if (!updatedProduct) {
    //         return res.status(404).send('No existe el producto');
    //     }
    //     return res.status(200).json(updatedProduct);
    // }

    // @Delete(':id')
    // @UseGuards(AuthGuard)
    // async deleteProduct(@Param('id') id: string, @Res() res: Response) {
    //     const productId = Number(id);
    //     if (isNaN(productId)) {
    //         return res.status(400).send('ID no válido');
    //     }

    //     const deletedProduct = await this.productService.deleteProduct(productId);
    //     if (!deletedProduct) {
    //         return res.status(404).send('No existe el producto');
    //     }

    //     return res.status(200).json({
    //         message: 'Producto eliminado con éxito',
    //         product: deletedProduct
    //     });
    // }
}
