import { BillingProduct } from '../entities/billing-product.entity';

export interface BillingProductRepository {
    create(product: Partial<BillingProduct>): Promise<BillingProduct>;
    findAll(): Promise<BillingProduct[]>;
    findById(id: string): Promise<BillingProduct | null>;
    findByInventoryProductId(inventoryProductId: string): Promise<BillingProduct | null>;
    update(id: string, product: Partial<BillingProduct>): Promise<BillingProduct>;
    delete(id: string): Promise<void>;
}

export const BILLING_PRODUCT_REPOSITORY = Symbol('BILLING_PRODUCT_REPOSITORY');
