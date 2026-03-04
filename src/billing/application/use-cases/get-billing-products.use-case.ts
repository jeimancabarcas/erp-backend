import { Inject, Injectable } from '@nestjs/common';
import { BILLING_PRODUCT_REPOSITORY } from '../../domain/repositories/billing-product.repository';
import type { BillingProductRepository } from '../../domain/repositories/billing-product.repository';
import type { BillingProduct } from '../../domain/entities/billing-product.entity';

@Injectable()
export class GetBillingProductsUseCase {
    constructor(
        @Inject(BILLING_PRODUCT_REPOSITORY)
        private readonly billingProductRepository: BillingProductRepository,
    ) { }

    async execute(): Promise<BillingProduct[]> {
        return this.billingProductRepository.findAll();
    }
}
