import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BillingService } from './billing-service.entity';
import { BillingTax } from './billing-tax.entity';

@Entity('billing_service_taxes')
export class BillingServiceTax {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    serviceId: string;

    @Column({ type: 'uuid' })
    taxId: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    rate: number;

    @ManyToOne(() => BillingService, (service) => service.taxes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'serviceId' })
    service: BillingService;

    @ManyToOne(() => BillingTax)
    @JoinColumn({ name: 'taxId' })
    tax: BillingTax;
}
