import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/entities/order.entity";
import { OrderDetails } from "src/entities/orderDetails.entity";
import { Product } from "src/entities/product.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { DataSource } from 'typeorm';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderDetails)
        private orderDetailRepository: Repository<OrderDetails>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private dataSource: DataSource,
    ) { }

    async addOrder(userId: string, products: { id: string }[]) {
        if (!userId || !Array.isArray(products) || products.length === 0) {
            throw new Error('Datos de orden inválidos.');
        }


        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const user = await this.userRepository.findOneBy({ id: userId });
            if (!user) {
                throw new Error(`Usuario con id ${userId} no encontrado`);
            }
            const order = new Order();
            order.date = new Date();
            const { password, isAdmin, ...userWithoutSensitiveData } = user;
            const safeUser: Omit<User, 'password' | 'isAdmin'> = userWithoutSensitiveData;
            order.user = safeUser;

            const newOrder = await queryRunner.manager.save(Order, order);

            let total = 0;
            const validProducts = await Promise.all(
                products.map(async (product) => {
                    const foundProduct = await this.productRepository.findOneBy({ id: product.id });
                    if (!foundProduct) return null;


                    if (foundProduct.stock <= 0) {
                        throw new Error(`El producto ${foundProduct.name} no tiene stock disponible.`);
                    }


                    foundProduct.stock -= 1;
                    total += Number(foundProduct.price);

                    await queryRunner.manager.save(Product, foundProduct);
                    return foundProduct;
                }),
            );

            const productsArray = validProducts.filter((product): product is Product => product !== null);

            if (productsArray.length === 0) {
                throw new Error('No se encontraron productos válidos.');
            }

            const orderDetails = new OrderDetails();
            orderDetails.price = Number(total.toFixed(2));
            orderDetails.products = productsArray;
            orderDetails.order = newOrder;

            await queryRunner.manager.save(OrderDetails, orderDetails);


            await queryRunner.commitTransaction();

            return await this.orderRepository.find({
                where: { id: newOrder.id },
                relations: {
                    orderDetails: true,
                },
            });
        } catch (error) {

            await queryRunner.rollbackTransaction();
            throw error;
        } finally {

            await queryRunner.release();
        }
    }

    getOrder(id: string) {
        const order = this.orderRepository.findOne({
            where: { id },
            relations: {
                orderDetails: {
                    products: true,
                },
            },
        });
        if (!order) {
            return `Orden con ID ${id} no encontrada `;
        }
        return order;
    }
}
