import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Category } from "./category.entity"
import { v4 as uuid } from 'uuid';
import { OrderDetails } from './orderDetails.entity';

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    name: string;

    @Column('text', { nullable: false })
    description: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    price: number;

    @Column('int', { nullable: false })
    stock: number;

    @Column({ default: 'https://odoo-community.org/web/image/product.template/3936/image_1024?unique=f578478' })
    imgUrl: string;


    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;


    @ManyToMany(() => OrderDetails, orderDetails => orderDetails.products)
    orderDetails: OrderDetails[];
}
