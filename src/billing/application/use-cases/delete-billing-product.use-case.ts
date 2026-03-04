import { Inject, Injectable } from '@nestjs/common';
import { BILLING_PRODUCT_REPOSITORY } from '../../domain/repositories/billing-product.repository';
import type { BillingProductRepository } from '../../domain/repositories/billing-product.repository';

@Injectable()
export class DeleteBillingProductUseCase {
    constructor(
        @Inject(BILLING_PRODUCT_REPOSITORY)
        private readonly billingProductRepository: BillingProductRepository,
    ) { }

    async execute(id: string): Promise<void> {
        return this.billingProductRepository.delete(id);
    }
}
