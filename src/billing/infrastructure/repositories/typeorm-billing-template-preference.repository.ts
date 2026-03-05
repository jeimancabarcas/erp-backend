import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingTemplatePreference } from '../../domain/entities/billing-template-preference.entity';
import { IBillingTemplatePreferenceRepository } from '../../domain/repositories/billing-template-preference.repository';

@Injectable()
export class TypeOrmBillingTemplatePreferenceRepository implements IBillingTemplatePreferenceRepository {
    constructor(
        @InjectRepository(BillingTemplatePreference)
        private readonly repository: Repository<BillingTemplatePreference>,
    ) { }

    async getPreference(): Promise<BillingTemplatePreference> {
        const pref = await this.repository.findOne({ where: {} });
        if (pref) return pref;

        // No record yet — return a transient default (not persisted until PUT is called)
        const defaults = new BillingTemplatePreference();
        defaults.primaryColor = '#2dd4bf';
        defaults.secondaryColor = '#14b8a6';
        defaults.logoUrl = null;
        return defaults;
    }

    async upsertPreference(preferenceData: Partial<BillingTemplatePreference>): Promise<BillingTemplatePreference> {
        const pref = await this.repository.findOne({ where: {} });

        if (pref) {
            // Update existing record
            const { id: _, ...safeData } = preferenceData;
            Object.assign(pref, safeData);
            return await this.repository.save(pref);
        } else {
            // Create fresh record — let TypeORM generate the UUID
            const { id: _, ...safeData } = preferenceData;
            const newPref = this.repository.create(safeData as BillingTemplatePreference);
            return await this.repository.save(newPref);
        }
    }
}
