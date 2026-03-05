import { BillingPaymentMethod } from '../entities/billing-payment-method.entity';

export const BILLING_PAYMENT_METHOD_REPOSITORY = 'BILLING_PAYMENT_METHOD_REPOSITORY';

export interface BillingPaymentMethodRepository {
    create(paymentMethod: Partial<BillingPaymentMethod>): Promise<BillingPaymentMethod>;
    findAll(): Promise<BillingPaymentMethod[]>;
    findById(id: string): Promise<BillingPaymentMethod | null>;
    update(id: string, paymentMethod: Partial<BillingPaymentMethod>): Promise<BillingPaymentMethod>;
    delete(id: string): Promise<void>;
}
