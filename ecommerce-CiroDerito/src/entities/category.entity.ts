import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50, nullable: false, unique: true })
    name: string;

    @OneToMany(() => Product, product => product.category)
    @JoinColumn({ name: 'product_id' })
    products: Product[];
}
