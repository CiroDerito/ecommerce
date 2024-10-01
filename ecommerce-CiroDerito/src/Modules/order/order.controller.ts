import { BadRequestException, Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "src/dtos/order.dto";
import { AuthGuard } from "../auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async addOrder(@Body() order: CreateOrderDto) {
        try {
            const { userId, products } = order;

            if (!userId || !Array.isArray(products) || products.length === 0) {
                throw new BadRequestException('Datos de orden inválidos.');
            }

            return await this.orderService.addOrder(userId, products);
        } catch (error) {
            console.error('Error al agregar la orden:', error.message);
            throw new BadRequestException('Datos de orden inválidos.');
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getOrder(@Param('id', ParseUUIDPipe) id: string) {
        return await this.orderService.getOrder(id);
    }
}