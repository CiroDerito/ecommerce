import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ length: 50, nullable: false, unique: true })
    email: string;

    @Column({ length: 128, nullable: false })
    password: string;

    @Column('int')
    phone: number;

    @Column({ length: 50 })
    country: string;

    @Column('text')
    address: string;

    @Column({
        type: "boolean",
        default: false
    })
    isAdmin: boolean

    @Column({ length: 50, nullable: true })
    city: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}
