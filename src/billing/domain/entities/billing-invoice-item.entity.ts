import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('billing_invoice_items')
export class BillingInvoiceItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'uuid', nullable: true })
    itemId: string | null;

    @Column({ type: 'varchar', length: 20, nullable: true })
    itemType: string | null;

    @Column({ type: 'varchar', length: 100, nullable: true })
    standardCode: string | null;

    @Column({ type: 'varchar', length: 100, nullable: true })
    internalCode: string | null;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subTotal: number;

    @Column({ type: 'uuid' })
    invoiceId: string;

    @ManyToOne('BillingInvoice', 'items', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'invoiceId' })
    invoice: any;

    @OneToMany('BillingInvoiceItemTax', 'invoiceItem', { cascade: true })
    taxes: any[];
}
