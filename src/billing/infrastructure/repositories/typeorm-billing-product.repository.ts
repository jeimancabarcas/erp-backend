import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingProduct } from '../../domain/entities/billing-product.entity';
import { BillingProductTax } from '../../domain/entities/billing-product-tax.entity';
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
            relations: ['inventoryProduct', 'taxes', 'taxes.tax'],
            order: { createdAt: 'DESC' }
        });
    }

    async findById(id: string): Promise<BillingProduct | null> {
        const product = await this.repository.findOne({
            where: { id },
            relations: ['inventoryProduct', 'taxes', 'taxes.tax']
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

        const { taxes, ...otherData } = productData;
        Object.assign(product, otherData);

        if (taxes !== undefined) {
            const incomingTaxes = taxes as any[];
            const currentTaxes = product.taxes || [];

            // 1. Identify and remove taxes no longer present
            const incomingTaxDefIds = incomingTaxes.map(t => t.taxId);
            const taxesToRemove = currentTaxes.filter(ct => !incomingTaxDefIds.includes(ct.taxId));
            if (taxesToRemove.length > 0) {
                await this.repository.manager.remove(taxesToRemove);
            }

            // 2. Map incoming taxes to entity objects, preserving IDs for existing ones
            product.taxes = incomingTaxes.map(it => {
                let existing = currentTaxes.find(ct => ct.taxId === it.taxId);
                const tax = existing || new BillingProductTax();

                tax.taxId = it.taxId;
                tax.rate = it.rate;
                tax.productId = product.id;
                // tax.product = product; // Remove to prevent circular JSON error

                return tax;
            });
        }

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
