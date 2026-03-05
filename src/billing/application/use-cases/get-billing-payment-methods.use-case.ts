import { Injectable, Inject } from '@nestjs/common';
import { BillingPaymentMethod } from '../../domain/entities/billing-payment-method.entity';
import type { BillingPaymentMethodRepository } from '../../domain/repositories/billing-payment-method.repository';
import { BILLING_PAYMENT_METHOD_REPOSITORY } from '../../domain/repositories/billing-payment-method.repository';

@Injectable()
export class GetBillingPaymentMethodsUseCase {
    constructor(
        @Inject(BILLING_PAYMENT_METHOD_REPOSITORY)
        private readonly repository: BillingPaymentMethodRepository,
    ) { }

    async execute(): Promise<BillingPaymentMethod[]> {
        return await this.repository.findAll();
    }
}
