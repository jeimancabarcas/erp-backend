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

    async findAll(query?: any): Promise<{ data: Movement[], total: number }> {
        const qb = this.repository.createQueryBuilder('movement');
        qb.leftJoinAndSelect('movement.product', 'product');

        if (query) {
            const { search, direction, type, sortBy, sortOrder, page, limit } = query;

            if (search) {
                qb.andWhere(
                    '(product.name ILIKE :search OR product.sku ILIKE :search OR movement.reference ILIKE :search)',
                    { search: `%${search}%` }
                );
            }

            if (direction) {
                qb.andWhere('movement.direction = :direction', { direction });
            }

            if (type) {
                qb.andWhere('movement.type = :type', { type });
            }

            // Sorting
            const order = sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
            const sortMapping: Record<string, string> = {
                date: 'movement.date',
                productName: 'product.name',
                productSku: 'product.sku',
                quantity: 'movement.quantity',
                createdAt: 'movement.createdAt'
            };

            const sortField = sortMapping[sortBy] || 'movement.createdAt';
            qb.orderBy(sortField, order);

            // Pagination
            const p = page ? parseInt(page.toString(), 10) : 1;
            const l = limit ? parseInt(limit.toString(), 10) : 10;
            const skip = (p - 1) * l;
            qb.skip(skip).take(l);
        } else {
            qb.orderBy('movement.createdAt', 'DESC');
        }

        const [entities, total] = await qb.getManyAndCount();
        return {
            data: entities.map(e => this.toDomain(e)),
            total
        };
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
