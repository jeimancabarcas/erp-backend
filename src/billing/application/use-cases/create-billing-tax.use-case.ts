import { Injectable, Inject } from '@nestjs/common';
import { BillingTax } from '../../domain/entities/billing-tax.entity';
import type { BillingTaxRepository } from '../../domain/repositories/billing-tax.repository';
import { BILLING_TAX_REPOSITORY } from '../../domain/repositories/billing-tax.repository';
import { CreateBillingTaxDto } from '../dtos/billing-tax.dto';

@Injectable()
export class CreateBillingTaxUseCase {
    constructor(
        @Inject(BILLING_TAX_REPOSITORY)
        private readonly repository: BillingTaxRepository,
    ) { }

    async execute(createDto: CreateBillingTaxDto): Promise<BillingTax> {
        return await this.repository.create(createDto);
    }
}
