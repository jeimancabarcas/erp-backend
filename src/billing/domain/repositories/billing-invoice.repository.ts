import { BillingInvoice } from '../entities/billing-invoice.entity';

export const BILLING_INVOICE_REPOSITORY = 'BILLING_INVOICE_REPOSITORY';

export abstract class BillingInvoiceRepository {
    abstract save(invoice: BillingInvoice): Promise<BillingInvoice>;
    abstract findAll(): Promise<BillingInvoice[]>;
    abstract findById(id: string): Promise<BillingInvoice | null>;
    abstract findLastInvoiceNumber(): Promise<string | null>;
}
