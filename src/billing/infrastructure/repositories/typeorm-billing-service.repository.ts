import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingService } from '../../domain/entities/billing-service.entity';
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
            order: { createdAt: 'DESC' },
        });
    }

    async findById(id: string): Promise<BillingService | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async update(id: string, serviceData: Partial<BillingService>): Promise<BillingService> {
        const service = await this.findById(id);
        if (!service) {
            throw new NotFoundException(`Service with id ${id} not found`);
        }

        Object.assign(service, serviceData);
        return await this.repository.save(service);
    }

    async delete(id: string): Promise<void> {
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Service with id ${id} not found`);
        }
    }
}
