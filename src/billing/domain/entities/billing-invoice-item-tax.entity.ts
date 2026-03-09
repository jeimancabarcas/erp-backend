import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('billing_invoice_item_taxes')
export class BillingInvoiceItemTax {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    taxName: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    taxRate: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    taxAmount: number;

    @Column({ type: 'uuid' })
    invoiceItemId: string;

    @ManyToOne('BillingInvoiceItem', 'taxes', { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'invoiceItemId' })
    invoiceItem: any;
}
