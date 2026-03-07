import { Injectable, Inject } from '@nestjs/common';
import { BillingPaymentTerm } from '../../domain/entities/billing-payment-term.entity';
import type { BillingPaymentTermRepository } from '../../domain/repositories/billing-payment-term.repository';
import { BILLING_PAYMENT_TERM_REPOSITORY } from '../../domain/repositories/billing-payment-term.repository';

@Injectable()
export class GetBillingPaymentTermsUseCase {
    constructor(
        @Inject(BILLING_PAYMENT_TERM_REPOSITORY)
        private readonly repository: BillingPaymentTermRepository,
    ) { }

    async execute(): Promise<BillingPaymentTerm[]> {
        return await this.repository.findAll();
    }
}
