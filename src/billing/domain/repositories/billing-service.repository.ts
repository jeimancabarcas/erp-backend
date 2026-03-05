import { BillingService } from '../entities/billing-service.entity';

export const BILLING_SERVICE_REPOSITORY = 'BILLING_SERVICE_REPOSITORY';

export interface BillingServiceRepository {
    create(service: Partial<BillingService>): Promise<BillingService>;
    findAll(): Promise<BillingService[]>;
    findById(id: string): Promise<BillingService | null>;
    update(id: string, service: Partial<BillingService>): Promise<BillingService>;
    delete(id: string): Promise<void>;
}
