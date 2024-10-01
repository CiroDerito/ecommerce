import { IsNotEmpty, IsUUID, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Product } from 'src/entities/product.entity';
import { ProductDto } from './products.dto';

export class CreateOrderDto {

    @IsNotEmpty({ message: 'El userId no puede estar vacío' })
    @IsUUID('4', { message: 'El userId debe tener un formato UUID válido' })
    userId: string;

    @IsNotEmpty({ message: 'Debe incluir al menos un producto' })
    @IsArray({ message: 'Products debe ser un array' })
    @ArrayMinSize(1, { message: 'Debe haber al menos un producto en el array' })
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: Partial<ProductDto>[];
}
