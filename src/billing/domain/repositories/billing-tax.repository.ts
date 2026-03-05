import { BillingTax } from '../entities/billing-tax.entity';

export const BILLING_TAX_REPOSITORY = 'BILLING_TAX_REPOSITORY';

export interface BillingTaxRepository {
    create(tax: Partial<BillingTax>): Promise<BillingTax>;
    findAll(): Promise<BillingTax[]>;
    findById(id: string): Promise<BillingTax | null>;
    update(id: string, tax: Partial<BillingTax>): Promise<BillingTax>;
    delete(id: string): Promise<void>;
}
