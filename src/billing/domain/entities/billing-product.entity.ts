import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductOrmEntity } from '../../../inventory/products/infrastructure/entities/product.orm-entity';

@Entity('billing_products')
export class BillingProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string | null;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    standardCode: string | null;

    @Column({ type: 'varchar', length: 100, nullable: true })
    internalCode: string | null;

    @Column({ type: 'uuid', nullable: true })
    inventoryProductId: string | null;

    @ManyToOne(() => ProductOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'inventoryProductId' })
    inventoryProduct?: ProductOrmEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
