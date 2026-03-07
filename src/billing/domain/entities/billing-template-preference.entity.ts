import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('billing_template_preferences')
export class BillingTemplatePreference {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, default: '#2dd4bf' })
    primaryColor: string;

    @Column({ type: 'varchar', length: 50, default: '#14b8a6' })
    secondaryColor: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    logoUrl: string | null;

    @Column({ type: 'varchar', length: 50, nullable: true })
    nit: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    companyName: string | null;

    @Column({ type: 'text', nullable: true })
    address: string | null;

    @Column({ type: 'varchar', length: 50, nullable: true })
    phone1: string | null;

    @Column({ type: 'varchar', length: 50, nullable: true })
    phone2: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    email: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    website: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
