import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingProduct } from '../../domain/entities/billing-product.entity';
import { BillingProductRepository } from '../../domain/repositories/billing-product.repository';

@Injectable()
export class TypeOrmBillingProductRepository implements BillingProductRepository {
    constructor(
        @InjectRepository(BillingProduct)
        private readonly repository: Repository<BillingProduct>,
    ) { }

    async create(productData: Partial<BillingProduct>): Promise<BillingProduct> {
        const product = this.repository.create(productData);
        return this.repository.save(product);
    }

    async findAll(): Promise<BillingProduct[]> {
        return this.repository.find({
            relations: ['inventoryProduct'],
            order: { createdAt: 'DESC' }
        });
    }

    async findById(id: string): Promise<BillingProduct | null> {
        const product = await this.repository.findOne({
            where: { id },
            relations: ['inventoryProduct']
        });
        return product || null;
    }

    async findByInventoryProductId(inventoryProductId: string): Promise<BillingProduct | null> {
        const product = await this.repository.findOne({
            where: { inventoryProductId }
        });
        return product || null;
    }

    async update(id: string, productData: Partial<BillingProduct>): Promise<BillingProduct> {
        const product = await this.findById(id);
        if (!product) {
            throw new NotFoundException(`BillingProduct with ID ${id} not found`);
        }

        Object.assign(product, productData);
        if (productData.inventoryProductId === null) {
            product.inventoryProduct = undefined;
            product.inventoryProductId = null;
        } else if (productData.inventoryProductId !== undefined) {
            product.inventoryProduct = undefined;
        }
        return this.repository.save(product);
    }

    async delete(id: string): Promise<void> {
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`BillingProduct with ID ${id} not found`);
        }
    }
}
