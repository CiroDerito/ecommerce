import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "../../entities/user.entity";
import { CreateUserDto, UpdateUserDto } from "src/dtos/user.dto";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async getUsers(page: number, limit: number) {
        try {
            return await this.userRepository.getUsers(page, limit);
        } catch (error) {
            console.error('Error en getUsers del servicio:', error);
            throw new Error('Error al obtener usuarios');
        }
    }

    async getUserById(id: string) {
        return this.userRepository.getUser(id)
    }

    async createUser(createUserDto: CreateUserDto): Promise<Partial<User>> {

        const user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.phone = createUserDto.phone;
        user.country = createUserDto.country;
        user.city = createUserDto.city;
        user.address = createUserDto.address;


        const newUser = await this.userRepository.createUser(user);
        return newUser;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {

        const user = new User();
        user.name = updateUserDto.name;
        user.email = updateUserDto.email;
        user.password = updateUserDto.password;
        user.phone = updateUserDto.phone;
        user.country = updateUserDto.country;
        user.city = updateUserDto.city;
        user.address = updateUserDto.address;

        return this.userRepository.updateUser(id, user);
    }

    async deleteUser(id: string) {
        return this.userRepository.deleteUser(id);
    }

}
