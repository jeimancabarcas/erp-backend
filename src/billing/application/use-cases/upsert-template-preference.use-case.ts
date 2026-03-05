import { Inject, Injectable } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';
import { BILLING_TEMPLATE_PREFERENCE_REPOSITORY } from '../../domain/repositories/billing-template-preference.repository';
import type { IBillingTemplatePreferenceRepository } from '../../domain/repositories/billing-template-preference.repository';

export class UpsertPreferenceDto {
    @IsOptional()
    @IsString()
    primaryColor?: string;

    @IsOptional()
    @IsString()
    secondaryColor?: string;

    @IsOptional()
    @IsString()
    logoUrl?: string | null;
}

@Injectable()
export class UpsertTemplatePreferenceUseCase {
    constructor(
        @Inject(BILLING_TEMPLATE_PREFERENCE_REPOSITORY)
        private readonly repository: IBillingTemplatePreferenceRepository,
    ) { }

    async execute(dto: UpsertPreferenceDto) {
        return this.repository.upsertPreference(dto);
    }
}
