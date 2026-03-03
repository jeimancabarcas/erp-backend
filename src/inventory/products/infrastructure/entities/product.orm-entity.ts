import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { CategoryOrmEntity } from '../../../categories/infrastructure/entities/category.orm-entity';
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

    @ManyToMany(() => CategoryOrmEntity)
    @JoinTable({
        name: 'product_categories',
        joinColumn: { name: 'product_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' }
    })
    categories: CategoryOrmEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
