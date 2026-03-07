import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { BillingPaymentFrequency } from '../../domain/entities/billing-payment-frequency.entity';
import type { BillingPaymentFrequencyRepository } from '../../domain/repositories/billing-payment-frequency.repository';
import { BILLING_PAYMENT_FREQUENCY_REPOSITORY } from '../../domain/repositories/billing-payment-frequency.repository';
import { UpdateBillingPaymentFrequencyDto } from '../dtos/billing-payment-frequency.dto';

@Injectable()
export class UpdateBillingPaymentFrequencyUseCase {
    constructor(
        @Inject(BILLING_PAYMENT_FREQUENCY_REPOSITORY)
        private readonly repository: BillingPaymentFrequencyRepository,
    ) { }

    async execute(id: string, updateDto: UpdateBillingPaymentFrequencyDto): Promise<BillingPaymentFrequency> {
        const frequency = await this.repository.findById(id);
        if (!frequency) {
            throw new NotFoundException('Payment frequency not found');
        }

        if (updateDto.name !== undefined) frequency.name = updateDto.name;
        if (updateDto.days !== undefined) frequency.days = updateDto.days;

        return await this.repository.save(frequency);
    }
}
