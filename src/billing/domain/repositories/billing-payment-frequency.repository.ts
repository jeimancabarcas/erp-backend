import { BillingPaymentFrequency } from '../entities/billing-payment-frequency.entity';

export const BILLING_PAYMENT_FREQUENCY_REPOSITORY = 'BILLING_PAYMENT_FREQUENCY_REPOSITORY';

export interface BillingPaymentFrequencyRepository {
    findAll(): Promise<BillingPaymentFrequency[]>;
    findById(id: string): Promise<BillingPaymentFrequency | null>;
}
