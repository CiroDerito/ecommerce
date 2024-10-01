import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    @InjectRepository(User) private userRepository: Repository<User>

    async getUsers(page: number, limit: number) {
        try {
            const skip = (page - 1) * limit;
            const users = await this.userRepository.find({
                take: limit,
                skip: skip,
            });
            return users.map(({ password, ...userNoPassword }) => userNoPassword);
        } catch (error) {
            console.error('Error en getUsers:', error);
            throw new Error('Error al obtener usuarios');
        }
    }

    async createUser(user: Partial<User>): Promise<Partial<User>> {
        const newUser = await this.userRepository.save(user);
        const savedUser = await this.userRepository.findOneBy({ id: newUser.id })
        const { password, isAdmin, ...userNoPassword } = savedUser;
        return userNoPassword;
    }

    async getUser(id: string) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: { orders: true },
        });
        
        if (!user) {
            throw new NotFoundException(`No se encontró al Usuario de id ${id}`);
        }
        
        const { password, ...userNoPassword } = user;
        return userNoPassword;
    }

    async updateUser(id: string, user: User): Promise<Partial<User>> {
        await this.userRepository.update(id, user);
        const updatedUser = await this.userRepository.findOneBy({ id });
        const { password, isAdmin, ...userNoPassword } = updatedUser;
        return userNoPassword;
    }

    async deleteUser(id: string): Promise<Partial<User>> {
        const user = await this.userRepository.findOneBy({ id });
        if (user) {
            await this.userRepository.remove(user);
            const { password, isAdmin, ...userNoPassword } = user;
            return userNoPassword;
        }
        return null;
    }


    async getUserByEmail(email: string) {
        return await this.userRepository.findOneBy({ email });
    }
}
