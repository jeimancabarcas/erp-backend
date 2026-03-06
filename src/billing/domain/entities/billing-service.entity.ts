import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BillingServiceTax } from './billing-service-tax.entity';

@Entity('billing_services')
export class BillingService {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'varchar', nullable: true })
    standardCode: string | null;

    @Column() // internalCode is mandatory for services just like products
    internalCode: string;

    @OneToMany(() => BillingServiceTax, (serviceTax) => serviceTax.service, { cascade: true, orphanRemoval: true } as any)
    taxes: BillingServiceTax[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
