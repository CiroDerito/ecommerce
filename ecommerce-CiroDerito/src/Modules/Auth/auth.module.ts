import { Module } from "@nestjs/common";
import { UserRepository } from "../users/user.repository";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [UserRepository, AuthService],
})
export class AuthModule {

}