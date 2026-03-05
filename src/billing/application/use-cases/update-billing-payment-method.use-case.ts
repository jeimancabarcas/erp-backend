import { Injectable, Inject } from '@nestjs/common';
import { BillingPaymentMethod } from '../../domain/entities/billing-payment-method.entity';
import type { BillingPaymentMethodRepository } from '../../domain/repositories/billing-payment-method.repository';
import { BILLING_PAYMENT_METHOD_REPOSITORY } from '../../domain/repositories/billing-payment-method.repository';
import { UpdateBillingPaymentMethodDto } from '../dtos/billing-payment-method.dto';

@Injectable()
export class UpdateBillingPaymentMethodUseCase {
    constructor(
        @Inject(BILLING_PAYMENT_METHOD_REPOSITORY)
        private readonly repository: BillingPaymentMethodRepository,
    ) { }

    async execute(id: string, updateDto: UpdateBillingPaymentMethodDto): Promise<BillingPaymentMethod> {
        return await this.repository.update(id, updateDto);
    }
}
