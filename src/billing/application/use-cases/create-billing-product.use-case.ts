import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { BILLING_PRODUCT_REPOSITORY } from '../../domain/repositories/billing-product.repository';
import type { BillingProductRepository } from '../../domain/repositories/billing-product.repository';
import { CreateBillingProductDto } from '../dtos/billing-product.dto';
import type { BillingProduct } from '../../domain/entities/billing-product.entity';

@Injectable()
export class CreateBillingProductUseCase {
    constructor(
        @Inject(BILLING_PRODUCT_REPOSITORY)
        private readonly billingProductRepository: BillingProductRepository,
    ) { }

    async execute(createBillingProductDto: CreateBillingProductDto): Promise<BillingProduct> {
        if (createBillingProductDto.inventoryProductId) {
            const existing = await this.billingProductRepository.findByInventoryProductId(createBillingProductDto.inventoryProductId);
            if (existing) {
                throw new ConflictException('Este producto de inventario ya se encuentra vinculado a otro producto de facturación.');
            }
        }
        return this.billingProductRepository.create({
            ...createBillingProductDto,
            taxes: createBillingProductDto.taxes?.map(t => ({ taxId: t.taxId, rate: t.rate })) as any
        });
    }
}
