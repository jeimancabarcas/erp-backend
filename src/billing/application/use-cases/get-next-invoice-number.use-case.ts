import { Injectable } from '@nestjs/common';
import { BillingInvoiceRepository } from '../../domain/repositories/billing-invoice.repository';

@Injectable()
export class GetNextInvoiceNumberUseCase {
    constructor(private readonly repository: BillingInvoiceRepository) { }

    async execute(): Promise<{ nextNumber: string }> {
        const lastNumber = await this.repository.findLastInvoiceNumber();
        return { nextNumber: this.generateNextNumber(lastNumber) };
    }

    private generateNextNumber(lastNumber: string | null): string {
        if (!lastNumber) return '00001';

        const numericMatch = lastNumber.match(/\d+/);
        if (!numericMatch) return '00001';

        const lastNumericValue = parseInt(numericMatch[0], 10);
        const nextNumericValue = lastNumericValue + 1;

        return nextNumericValue.toString().padStart(5, '0');
    }
}
