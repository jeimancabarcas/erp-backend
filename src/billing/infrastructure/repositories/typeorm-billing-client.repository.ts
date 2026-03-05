import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingClient } from '../../domain/entities/billing-client.entity';
import { BillingClientRepository } from '../../domain/repositories/billing-client.repository';

@Injectable()
export class TypeOrmBillingClientRepository implements BillingClientRepository {
    constructor(
        @InjectRepository(BillingClient)
        private readonly repository: Repository<BillingClient>,
    ) { }

    async create(client: Partial<BillingClient>): Promise<BillingClient> {
        const newClient = this.repository.create(client);
        return await this.repository.save(newClient);
    }

    async findAll(): Promise<BillingClient[]> {
        return await this.repository.find({
            order: { name: 'ASC' },
        });
    }

    async findById(id: string): Promise<BillingClient | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async update(id: string, updates: Partial<BillingClient>): Promise<BillingClient> {
        await this.repository.update(id, updates);
        const updated = await this.findById(id);
        if (!updated) {
            throw new Error(`BillingClient with ID ${id} not found after update`);
        }
        return updated;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
