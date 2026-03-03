import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../domain/product.entity';
import { ProductRepository } from '../../domain/product.repository';
import { ProductOrmEntity } from '../entities/product.orm-entity';

@Injectable()
export class TypeOrmProductRepository extends ProductRepository {
    constructor(
        @InjectRepository(ProductOrmEntity)
        private readonly ormRepo: Repository<ProductOrmEntity>,
    ) {
        super();
    }

    async findAll(): Promise<Product[]> {
        const rows = await this.ormRepo.find({ order: { createdAt: 'DESC' } });
        return rows.map(this.toDomain);
    }

    async findById(id: string): Promise<Product | null> {
        const row = await this.ormRepo.findOne({ where: { id } });
        return row ? this.toDomain(row) : null;
    }

    async findBySku(sku: string): Promise<Product | null> {
        const row = await this.ormRepo.findOne({ where: { sku } });
        return row ? this.toDomain(row) : null;
    }

    async save(product: Product): Promise<Product> {
        const orm = this.toOrm(product);
        const saved = await this.ormRepo.save(orm);
        return this.toDomain(saved);
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
            row.categories,
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
            categories: product.categories,
        };
    }
}
