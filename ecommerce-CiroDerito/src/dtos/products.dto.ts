import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProductDto {
    @IsNotEmpty({ message: 'El id del producto no puede estar vacío' })
    @IsUUID('4', { message: 'El id del producto debe tener un formato UUID válido' })
    id: string;
}