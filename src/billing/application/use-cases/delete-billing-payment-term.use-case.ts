import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { BillingPaymentTermRepository } from '../../domain/repositories/billing-payment-term.repository';
import { BILLING_PAYMENT_TERM_REPOSITORY } from '../../domain/repositories/billing-payment-term.repository';

@Injectable()
export class DeleteBillingPaymentTermUseCase {
    constructor(
        @Inject(BILLING_PAYMENT_TERM_REPOSITORY)
        private readonly repository: BillingPaymentTermRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const term = await this.repository.findById(id);
        if (!term) {
            throw new NotFoundException('Payment term not found');
        }
        await this.repository.delete(id);
    }
}
