import { ApiHideProperty, ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches, Validate, } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío' })
    @Length(3, 80, { message: 'El nombre debe contener entre 3 y 80 caracteres' })
    name: string;

    @ApiProperty({
       example:'El Email debe tener un formato valido'
    })
    @IsEmail({}, { message: 'El formato debe ser de mail, ejemplo@mail.com' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
        {
            message: 'La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*)'
        }
    )
    password: string;

    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;


    @IsEmpty()
    @ApiHideProperty()
    isAdmin?: boolean

    @Length(3, 80, { message: 'La direecion debe contener entre 3 y 80 caracteres' })
    address: string;

    @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
    @IsNumber({}, { message: 'El número de teléfono debe ser un número válido' })
    phone: number;

    @IsNotEmpty({ message: 'El país no puede estar vacío' })
    @IsString({ message: 'El país debe ser una cadena de texto' })
    @Length(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres' })
    country: string;

    @IsNotEmpty({ message: 'El campo ciudad no puede estar vacía' })
    @IsString({ message: 'La ciudad debe ser una cadena de texto' })
    @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres' })
    city: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password']) { }

