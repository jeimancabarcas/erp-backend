import { Injectable, Inject } from '@nestjs/common';
import type { BillingTaxRepository } from '../../domain/repositories/billing-tax.repository';
import { BILLING_TAX_REPOSITORY } from '../../domain/repositories/billing-tax.repository';

@Injectable()
export class DeleteBillingTaxUseCase {
    constructor(
        @Inject(BILLING_TAX_REPOSITORY)
        private readonly repository: BillingTaxRepository,
    ) { }

    async execute(id: string): Promise<void> {
        return await this.repository.delete(id);
    }
}
