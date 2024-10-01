import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from "./user.entity";
import { OrderDetails } from './orderDetails.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('date')
    date: Date;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: Omit<User, 'password' | 'isAdmin'>;

    @OneToOne(() => OrderDetails, (orderDetails => orderDetails.order))
    orderDetails: OrderDetails;
}
