import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/product.entity';
import { ProductRepository } from '../../domain/product.repository';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { GetProductsQueryDto } from '../../application/dtos/get-products-query.dto';

@Injectable()
export class TypeOrmProductRepository extends ProductRepository {
    constructor(
        @InjectRepository(ProductOrmEntity)
        private readonly ormRepo: Repository<ProductOrmEntity>,
    ) {
        super();
    }

    async findAll(query?: GetProductsQueryDto): Promise<Product[]> {
        const qb = this.ormRepo.createQueryBuilder('p')
            .leftJoinAndSelect('p.categories', 'category');

        if (query?.search) {
            const term = `%${query.search}%`;
            qb.where('p.name ILIKE :term OR p.sku ILIKE :term', { term });
        }

        const sortField = query?.sortBy ?? 'createdAt';
        const sortOrder = query?.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        qb.orderBy(`p.${sortField}`, sortOrder);

        const rows = await qb.getMany();
        return rows.map(this.toDomain);
    }

    async findById(id: string): Promise<Product | null> {
        const row = await this.ormRepo.findOne({ where: { id }, relations: ['categories'] });
        return row ? this.toDomain(row) : null;
    }

    async findBySku(sku: string): Promise<Product | null> {
        const row = await this.ormRepo.findOne({ where: { sku }, relations: ['categories'] });
        return row ? this.toDomain(row) : null;
    }

    async save(product: Product): Promise<Product> {
        const orm = this.toOrm(product);
        const saved = await this.ormRepo.save(orm);
        return this.toDomain(saved);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }

    // ── Mappers ────────────────────────────────────────────────────────────
    private toDomain(row: ProductOrmEntity): Product {
        return new Product(
            row.id,
            row.sku,
            row.name,
            row.description,
            row.stock,
            row.minStock,
            row.maxStock,
            row.categories?.map(c => ({ id: c.id, name: c.name })) || [],
            row.createdAt,
            row.updatedAt,
        );
    }

    private toOrm(product: Product): Partial<ProductOrmEntity> {
        return {
            id: product.id,
            sku: product.sku,
            name: product.name,
            description: product.description,
            stock: product.stock,
            minStock: product.minStock,
            maxStock: product.maxStock,
            categories: product.categories.map(c => ({ id: c.id } as any)),
        };
    }
}
