import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('billing_invoices')
export class BillingInvoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50 })
    invoiceNumber: string;

    @Column({ type: 'uuid', nullable: true })
    clientId: string | null;

    @Column({ type: 'varchar', length: 50, default: 'Emitida' })
    status: string;

    @Column({ type: 'timestamp' })
    invoiceDate: Date;

    // Company Snapshot (Seller)
    @Column({ type: 'varchar', length: 255 })
    companyName: string;

    @Column({ type: 'varchar', length: 50 })
    companyNit: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    companyAddress: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    companyPhone: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    companyEmail: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    companyWebsite: string;

    @Column({ type: 'text', nullable: true })
    companyLogoUrl: string;

    // Client Snapshot (Buyer)
    @Column({ type: 'varchar', length: 255 })
    clientName: string;

    @Column({ type: 'varchar', length: 50 })
    clientDocumentType: string;

    @Column({ type: 'varchar', length: 50 })
    clientDocumentNumber: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    clientAddress: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    clientPhone: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    clientEmail: string;

    // Payment Snapshot
    @Column({ type: 'varchar', length: 50 })
    paymentType: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    paymentMethodName: string;

    @Column({ type: 'text', nullable: true })
    paymentMethodDetails: string;

    // Credit Snapshot
    @Column({ type: 'int', default: 1 })
    creditInstallments: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    creditFrequencyName: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    creditTermName: string;

    // Totals
    @Column({ type: 'decimal', precision: 12, scale: 2 })
    subTotal: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    taxAmount: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    discountAmount: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    grandTotal: number;

    // Appearance & Terms
    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    signatureName: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    signaturePosition: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    signatureIdType: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    signatureIdNumber: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    signatureFont: string;

    @OneToMany('BillingInvoiceItem', 'invoice', { cascade: true })
    items: any[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
