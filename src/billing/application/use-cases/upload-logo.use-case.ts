import { Inject, Injectable } from '@nestjs/common';
import { BILLING_TEMPLATE_PREFERENCE_REPOSITORY } from '../../domain/repositories/billing-template-preference.repository';
import type { IBillingTemplatePreferenceRepository } from '../../domain/repositories/billing-template-preference.repository';

@Injectable()
export class UploadLogoUseCase {
    constructor(
        @Inject(BILLING_TEMPLATE_PREFERENCE_REPOSITORY)
        private readonly repository: IBillingTemplatePreferenceRepository,
    ) { }

    async execute(filename: string): Promise<{ logoUrl: string }> {
        const logoUrl = `/uploads/${filename}`;
        await this.repository.upsertPreference({ logoUrl });
        return { logoUrl };
    }
}
