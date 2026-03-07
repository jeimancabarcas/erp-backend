import { BillingPaymentTerm } from '../entities/billing-payment-term.entity';

export const BILLING_PAYMENT_TERM_REPOSITORY = 'BILLING_PAYMENT_TERM_REPOSITORY';

export interface BillingPaymentTermRepository {
    findAll(): Promise<BillingPaymentTerm[]>;
    findById(id: string): Promise<BillingPaymentTerm | null>;
    save(term: BillingPaymentTerm): Promise<BillingPaymentTerm>;
    delete(id: string): Promise<void>;
}
