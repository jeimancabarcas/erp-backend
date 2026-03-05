import { Injectable, Inject } from '@nestjs/common';
import { BillingTax } from '../../domain/entities/billing-tax.entity';
import type { BillingTaxRepository } from '../../domain/repositories/billing-tax.repository';
import { BILLING_TAX_REPOSITORY } from '../../domain/repositories/billing-tax.repository';
import { UpdateBillingTaxDto } from '../dtos/billing-tax.dto';

@Injectable()
export class UpdateBillingTaxUseCase {
    constructor(
        @Inject(BILLING_TAX_REPOSITORY)
        private readonly repository: BillingTaxRepository,
    ) { }

    async execute(id: string, updateDto: UpdateBillingTaxDto): Promise<BillingTax> {
        return await this.repository.update(id, updateDto);
    }
}
