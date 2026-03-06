import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BillingProduct } from './billing-product.entity';
import { BillingTax } from './billing-tax.entity';

@Entity('billing_product_taxes')
export class BillingProductTax {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    productId: string;

    @Column({ type: 'uuid' })
    taxId: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    rate: number;

    @ManyToOne(() => BillingProduct, (product) => product.taxes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'productId' })
    product: BillingProduct;

    @ManyToOne(() => BillingTax)
    @JoinColumn({ name: 'taxId' })
    tax: BillingTax;
}
