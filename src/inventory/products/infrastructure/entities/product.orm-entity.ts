import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, length: 50 })
    sku: string;

    @Column({ length: 150 })
    name: string;

    @Column({ type: 'text', default: '' })
    description: string;

    @Column({ type: 'int', default: 0 })
    stock: number;

    @Column({ name: 'min_stock', type: 'int', nullable: true, default: null })
    minStock: number | null;

    @Column({ name: 'max_stock', type: 'int', nullable: true, default: null })
    maxStock: number | null;

    @Column({ type: 'simple-array', default: '' })
    categories: string[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
