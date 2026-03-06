import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ProductOrmEntity } from '../../../inventory/products/infrastructure/entities/product.orm-entity';
import { BillingProductTax } from './billing-product-tax.entity';

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

    @OneToMany(() => BillingProductTax, (productTax) => productTax.product, { cascade: true, orphanRemoval: true } as any)
    taxes: BillingProductTax[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
