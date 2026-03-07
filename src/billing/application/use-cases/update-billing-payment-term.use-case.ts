import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { BillingPaymentTerm } from '../../domain/entities/billing-payment-term.entity';
import type { BillingPaymentTermRepository } from '../../domain/repositories/billing-payment-term.repository';
import { BILLING_PAYMENT_TERM_REPOSITORY } from '../../domain/repositories/billing-payment-term.repository';
import { UpdateBillingPaymentTermDto } from '../dtos/billing-payment-term.dto';

@Injectable()
export class UpdateBillingPaymentTermUseCase {
    constructor(
        @Inject(BILLING_PAYMENT_TERM_REPOSITORY)
        private readonly repository: BillingPaymentTermRepository,
    ) { }

    async execute(id: string, updateDto: UpdateBillingPaymentTermDto): Promise<BillingPaymentTerm> {
        const term = await this.repository.findById(id);
        if (!term) {
            throw new NotFoundException('Payment term not found');
        }

        if (updateDto.name !== undefined) term.name = updateDto.name;
        if (updateDto.days !== undefined) term.days = updateDto.days;

        return await this.repository.save(term);
    }
}
