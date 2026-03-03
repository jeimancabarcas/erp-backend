import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductOrmEntity } from '../../../products/infrastructure/entities/product.orm-entity';

@Entity('movements')
export class MovementOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp' })
    date: Date;

    @ManyToOne(() => ProductOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: ProductOrmEntity;

    @Column({ name: 'product_id' })
    productId: string;

    @Column({ type: 'varchar', length: 20 })
    direction: 'entrada' | 'salida';

    @Column({ type: 'varchar', length: 20 })
    type: 'compra' | 'venta' | 'manual' | 'sistema';

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'varchar', length: 150, nullable: true })
    reference: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
