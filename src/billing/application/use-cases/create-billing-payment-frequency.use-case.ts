import { Injectable, Inject } from '@nestjs/common';
import { BillingPaymentFrequency } from '../../domain/entities/billing-payment-frequency.entity';
import type { BillingPaymentFrequencyRepository } from '../../domain/repositories/billing-payment-frequency.repository';
import { BILLING_PAYMENT_FREQUENCY_REPOSITORY } from '../../domain/repositories/billing-payment-frequency.repository';
import { CreateBillingPaymentFrequencyDto } from '../dtos/billing-payment-frequency.dto';

@Injectable()
export class CreateBillingPaymentFrequencyUseCase {
    constructor(
        @Inject(BILLING_PAYMENT_FREQUENCY_REPOSITORY)
        private readonly repository: BillingPaymentFrequencyRepository,
    ) { }

    async execute(createDto: CreateBillingPaymentFrequencyDto): Promise<BillingPaymentFrequency> {
        const frequency = new BillingPaymentFrequency();
        frequency.name = createDto.name;
        frequency.days = createDto.days;
        return await this.repository.save(frequency);
    }
}
