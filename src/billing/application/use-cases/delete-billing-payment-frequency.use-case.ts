import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { BillingPaymentFrequencyRepository } from '../../domain/repositories/billing-payment-frequency.repository';
import { BILLING_PAYMENT_FREQUENCY_REPOSITORY } from '../../domain/repositories/billing-payment-frequency.repository';

@Injectable()
export class DeleteBillingPaymentFrequencyUseCase {
    constructor(
        @Inject(BILLING_PAYMENT_FREQUENCY_REPOSITORY)
        private readonly repository: BillingPaymentFrequencyRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const frequency = await this.repository.findById(id);
        if (!frequency) {
            throw new NotFoundException('Payment frequency not found');
        }
        await this.repository.delete(id);
    }
}
