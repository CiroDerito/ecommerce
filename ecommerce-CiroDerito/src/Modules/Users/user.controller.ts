import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import { AuthGuard } from "../auth/auth.guard";
import { UpdateUserDto } from "src/dtos/user.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";
import { RoleGuard } from "../auth/role.guard";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @HttpCode(200)
    @Roles(Role.Admin)
    @ApiBearerAuth()
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @UseGuards(RoleGuard)
    async getUsers(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '5'
    ) {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        if (isNaN(pageNumber) || isNaN(limitNumber)) {
            throw new BadRequestException('Los parámetros de página y límite deben ser números válidos.');
        }

        const users = await this.userService.getUsers(pageNumber, limitNumber);
        return { page: pageNumber, limit: limitNumber, data: users || [] };
    }


    @Put(':id')
    @ApiBearerAuth()
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
        try {
            const updatedUser = await this.userService.updateUser(id, updateUserDto);
            return res.status(200).json(updatedUser);
        } catch (error) {
            throw new NotFoundException(`El usuario con id  no existe para modificarlo`);
        }
    }

    @Delete(':id')
    @ApiBearerAuth()
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        try {
            const result = await this.userService.deleteUser(id);

            if (!result) {
                throw new NotFoundException('No existe el usuario');
            }
            return 'Usuario eliminado';

        } catch (error) {
            throw new NotFoundException('No existe el usuario')
        }
    }

    @Get(':id')
    @ApiBearerAuth()
    async getUserById(@Param('id', ParseUUIDPipe) id: string) {
        const user = await this.userService.getUserById(id);
        return user;
    }

    // @Post()
    // async createUser(@Body() createUserDto: CreateUserDto) {
    //     const newUser = await this.userService.createUser(createUserDto);
    //     return newUser;
    // }

}
