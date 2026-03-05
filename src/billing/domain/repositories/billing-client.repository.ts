import { BillingClient } from '../entities/billing-client.entity';

export const BILLING_CLIENT_REPOSITORY = 'BILLING_CLIENT_REPOSITORY';

export interface BillingClientRepository {
    create(client: Partial<BillingClient>): Promise<BillingClient>;
    findAll(): Promise<BillingClient[]>;
    findById(id: string): Promise<BillingClient | null>;
    update(id: string, updates: Partial<BillingClient>): Promise<BillingClient>;
    delete(id: string): Promise<void>;
}
