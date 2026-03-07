import { Injectable, Inject } from '@nestjs/common';
import { BillingPaymentTerm } from '../../domain/entities/billing-payment-term.entity';
import type { BillingPaymentTermRepository } from '../../domain/repositories/billing-payment-term.repository';
import { BILLING_PAYMENT_TERM_REPOSITORY } from '../../domain/repositories/billing-payment-term.repository';
import { CreateBillingPaymentTermDto } from '../dtos/billing-payment-term.dto';

@Injectable()
export class CreateBillingPaymentTermUseCase {
    constructor(
        @Inject(BILLING_PAYMENT_TERM_REPOSITORY)
        private readonly repository: BillingPaymentTermRepository,
    ) { }

    async execute(createDto: CreateBillingPaymentTermDto): Promise<BillingPaymentTerm> {
        const term = new BillingPaymentTerm();
        term.name = createDto.name;
        term.days = createDto.days;
        return await this.repository.save(term);
    }
}
