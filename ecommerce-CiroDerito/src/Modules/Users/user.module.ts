import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { AuthGuard } from "../auth/auth.guard";

@Module({
    imports: [TypeOrmModule.forFeature([User, UserRepository])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [TypeOrmModule],
})

export class UserModule { }
