import { Injectable, Inject } from '@nestjs/common';
import { BillingPaymentFrequency } from '../../domain/entities/billing-payment-frequency.entity';
import type { BillingPaymentFrequencyRepository } from '../../domain/repositories/billing-payment-frequency.repository';
import { BILLING_PAYMENT_FREQUENCY_REPOSITORY } from '../../domain/repositories/billing-payment-frequency.repository';

@Injectable()
export class GetBillingPaymentFrequenciesUseCase {
    constructor(
        @Inject(BILLING_PAYMENT_FREQUENCY_REPOSITORY)
        private readonly repository: BillingPaymentFrequencyRepository,
    ) { }

    async execute(): Promise<BillingPaymentFrequency[]> {
        return await this.repository.findAll();
    }
}
