import { Controller, Get, Put, Body } from '@nestjs/common';
import { GetTemplatePreferenceUseCase } from '../application/use-cases/get-template-preference.use-case';
import { UpsertTemplatePreferenceUseCase, UpsertPreferenceDto } from '../application/use-cases/upsert-template-preference.use-case';

@Controller('billing/preferences')
export class BillingTemplatePreferencesController {
    constructor(
        private readonly getPreferenceUseCase: GetTemplatePreferenceUseCase,
        private readonly upsertPreferenceUseCase: UpsertTemplatePreferenceUseCase,
    ) { }

    @Get()
    async getPreference() {
        return this.getPreferenceUseCase.execute();
    }

    @Put()
    async updatePreference(@Body() dto: UpsertPreferenceDto) {
        return this.upsertPreferenceUseCase.execute(dto);
    }
}
