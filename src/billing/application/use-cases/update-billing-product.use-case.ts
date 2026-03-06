import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { BILLING_PRODUCT_REPOSITORY } from '../../domain/repositories/billing-product.repository';
import type { BillingProductRepository } from '../../domain/repositories/billing-product.repository';
import { UpdateBillingProductDto } from '../dtos/billing-product.dto';
import type { BillingProduct } from '../../domain/entities/billing-product.entity';

@Injectable()
export class UpdateBillingProductUseCase {
    constructor(
        @Inject(BILLING_PRODUCT_REPOSITORY)
        private readonly billingProductRepository: BillingProductRepository,
    ) { }

    async execute(id: string, updateBillingProductDto: UpdateBillingProductDto): Promise<BillingProduct> {
        if (updateBillingProductDto.inventoryProductId) {
            const existing = await this.billingProductRepository.findByInventoryProductId(updateBillingProductDto.inventoryProductId);
            if (existing && existing.id !== id) {
                throw new ConflictException('Este producto de inventario ya se encuentra vinculado a otro producto de facturación.');
            }
        }
        return this.billingProductRepository.update(id, {
            ...updateBillingProductDto,
            taxes: updateBillingProductDto.taxes?.map(t => ({
                productId: id,
                taxId: t.taxId,
                rate: t.rate
            })) as any
        });
    }
}
