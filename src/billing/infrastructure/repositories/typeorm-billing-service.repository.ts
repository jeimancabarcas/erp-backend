import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingService } from '../../domain/entities/billing-service.entity';
import { BillingServiceTax } from '../../domain/entities/billing-service-tax.entity';
import { BillingServiceRepository } from '../../domain/repositories/billing-service.repository';

@Injectable()
export class TypeOrmBillingServiceRepository implements BillingServiceRepository {
    constructor(
        @InjectRepository(BillingService)
        private readonly repository: Repository<BillingService>,
    ) { }

    async create(service: Partial<BillingService>): Promise<BillingService> {
        const newService = this.repository.create(service);
        return await this.repository.save(newService);
    }

    async findAll(): Promise<BillingService[]> {
        return await this.repository.find({
            relations: ['taxes', 'taxes.tax'],
            order: { createdAt: 'DESC' },
        });
    }

    async findById(id: string): Promise<BillingService | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ['taxes', 'taxes.tax']
        });
    }

    async update(id: string, serviceData: Partial<BillingService>): Promise<BillingService> {
        const service = await this.findById(id);
        if (!service) {
            throw new NotFoundException(`Service with id ${id} not found`);
        }

        const { taxes, ...otherData } = serviceData;
        Object.assign(service, otherData);

        if (taxes !== undefined) {
            const incomingTaxes = taxes as any[];
            const currentTaxes = service.taxes || [];

            // 1. Identify and remove taxes no longer present
            const incomingTaxDefIds = incomingTaxes.map(t => t.taxId);
            const taxesToRemove = currentTaxes.filter(ct => !incomingTaxDefIds.includes(ct.taxId));
            if (taxesToRemove.length > 0) {
                await this.repository.manager.remove(taxesToRemove);
            }

            // 2. Map incoming taxes to entity objects, preserving IDs for existing ones
            service.taxes = incomingTaxes.map(it => {
                let existing = currentTaxes.find(ct => ct.taxId === it.taxId);
                const tax = existing || new BillingServiceTax();

                tax.taxId = it.taxId;
                tax.rate = it.rate;
                tax.serviceId = service.id;
                // tax.service = service; // Remove to prevent circular JSON error

                return tax;
            });
        }

        return await this.repository.save(service);
    }

    async delete(id: string): Promise<void> {
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Service with id ${id} not found`);
        }
    }
}
