import { Inject, Injectable } from '@nestjs/common';
import { BILLING_TEMPLATE_PREFERENCE_REPOSITORY } from '../../domain/repositories/billing-template-preference.repository';
import type { IBillingTemplatePreferenceRepository } from '../../domain/repositories/billing-template-preference.repository';

@Injectable()
export class GetTemplatePreferenceUseCase {
    constructor(
        @Inject(BILLING_TEMPLATE_PREFERENCE_REPOSITORY)
        private readonly repository: IBillingTemplatePreferenceRepository,
    ) { }

    async execute() {
        return this.repository.getPreference();
    }
}
