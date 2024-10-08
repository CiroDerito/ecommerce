import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository) { }

    addOrder(userId: string, product) {
        return this.orderRepository.addOrder(userId, product);
    }

    getOrder(id: string) {
        return this.orderRepository.getOrder(id);
    }
}

