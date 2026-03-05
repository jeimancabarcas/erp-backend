import { Injectable, Inject } from '@nestjs/common';
import type { BillingPaymentMethodRepository } from '../../domain/repositories/billing-payment-method.repository';
import { BILLING_PAYMENT_METHOD_REPOSITORY } from '../../domain/repositories/billing-payment-method.repository';

@Injectable()
export class DeleteBillingPaymentMethodUseCase {
    constructor(
        @Inject(BILLING_PAYMENT_METHOD_REPOSITORY)
        private readonly repository: BillingPaymentMethodRepository,
    ) { }

    async execute(id: string): Promise<void> {
        return await this.repository.delete(id);
    }
}
