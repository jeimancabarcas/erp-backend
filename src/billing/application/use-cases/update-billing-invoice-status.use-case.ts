import { Injectable, NotFoundException } from '@nestjs/common';
import { BillingInvoiceRepository } from '../../domain/repositories/billing-invoice.repository';
import { BillingInvoice } from '../../domain/entities/billing-invoice.entity';

@Injectable()
export class UpdateBillingInvoiceStatusUseCase {
    constructor(private readonly repository: BillingInvoiceRepository) { }

    async execute(id: string, status: string): Promise<BillingInvoice> {
        const invoice = await this.repository.findById(id);
        if (!invoice) {
            throw new NotFoundException(`Invoice with ID ${id} not found`);
        }

        invoice.status = status;
        return await this.repository.save(invoice);
    }
}
