import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/entities/order.entity";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { Product } from "src/entities/product.entity";
import { User } from "src/entities/user.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderRepository } from "./order.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderDetails, User, Product]),],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository]
})
export class OrderModule{
    
}