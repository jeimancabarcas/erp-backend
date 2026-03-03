import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movement } from '../../domain/movement.entity';
import { MovementRepository } from '../../domain/movement.repository';
import { MovementOrmEntity } from '../entities/movement.orm-entity';

@Injectable()
export class TypeOrmMovementRepository implements MovementRepository {
    constructor(
        @InjectRepository(MovementOrmEntity)
        private readonly repository: Repository<MovementOrmEntity>,
    ) { }

    async create(movement: Movement): Promise<Movement> {
        const ormEntity = this.toOrm(movement);
        const savedEntity = await this.repository.save(ormEntity);

        // Re-fetch with relations to ensure productName and productSku are populated
        const fullEntity = await this.repository.findOne({
            where: { id: savedEntity.id },
            relations: ['product']
        });

        return this.toDomain(fullEntity!);
    }

    async findAll(): Promise<Movement[]> {
        const entities = await this.repository.find({
            relations: ['product'],
            order: { createdAt: 'DESC' }
        });
        return entities.map(e => this.toDomain(e));
    }

    async findByProductId(productId: string): Promise<Movement[]> {
        const entities = await this.repository.find({
            where: { productId },
            relations: ['product'],
            order: { createdAt: 'DESC' }
        });
        return entities.map(e => this.toDomain(e));
    }

    private toDomain(ormEntity: MovementOrmEntity): Movement {
        return {
            id: ormEntity.id,
            date: ormEntity.date,
            productId: ormEntity.productId,
            productName: ormEntity.product?.name,
            productSku: ormEntity.product?.sku,
            direction: ormEntity.direction,
            type: ormEntity.type,
            quantity: ormEntity.quantity,
            reference: ormEntity.reference,
            notes: ormEntity.notes,
            createdAt: ormEntity.createdAt,
        };
    }

    private toOrm(domainEntity: Movement): MovementOrmEntity {
        const ormEntity = new MovementOrmEntity();
        if (domainEntity.id) ormEntity.id = domainEntity.id;
        ormEntity.date = domainEntity.date;
        ormEntity.productId = domainEntity.productId;
        // Setting the relation manually helps TypeORM save it properly
        ormEntity.product = { id: domainEntity.productId } as any;
        ormEntity.direction = domainEntity.direction;
        ormEntity.type = domainEntity.type;
        ormEntity.quantity = domainEntity.quantity;
        ormEntity.reference = domainEntity.reference;
        ormEntity.notes = domainEntity.notes;
        return ormEntity;
    }
}
