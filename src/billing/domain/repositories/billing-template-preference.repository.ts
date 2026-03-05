import { BillingTemplatePreference } from '../entities/billing-template-preference.entity';

export const BILLING_TEMPLATE_PREFERENCE_REPOSITORY = 'BILLING_TEMPLATE_PREFERENCE_REPOSITORY';

export interface IBillingTemplatePreferenceRepository {
    getPreference(): Promise<BillingTemplatePreference>;
    upsertPreference(preference: Partial<BillingTemplatePreference>): Promise<BillingTemplatePreference>;
}
