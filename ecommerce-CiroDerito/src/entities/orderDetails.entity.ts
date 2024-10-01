import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class OrderDetails {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;


    @OneToOne(() => Order, order => order.orderDetails)
    @JoinColumn({ name: 'order_id' })
    order: Order;


    @ManyToMany(() => Product, product => product.orderDetails)
    @JoinTable({
        name: 'orderDetails_products',
        joinColumn: {
            name: 'orderDetail_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        }
    })
    products: Product[];
}
