import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingTax } from '../../domain/entities/billing-tax.entity';
import { BillingTaxRepository } from '../../domain/repositories/billing-tax.repository';

@Injectable()
export class TypeOrmBillingTaxRepository implements BillingTaxRepository {
    constructor(
        @InjectRepository(BillingTax)
        private readonly repository: Repository<BillingTax>,
    ) { }

    async create(taxData: Partial<BillingTax>): Promise<BillingTax> {
        const tax = this.repository.create(taxData);
        return await this.repository.save(tax);
    }

    async findAll(): Promise<BillingTax[]> {
        return await this.repository.find({
            order: { createdAt: 'DESC' }
        });
    }

    async findById(id: string): Promise<BillingTax | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async update(id: string, taxData: Partial<BillingTax>): Promise<BillingTax> {
        const tax = await this.findById(id);
        if (!tax) {
            throw new NotFoundException(`Billing Tax with ID ${id} not found`);
        }

        Object.assign(tax, taxData);
        return await this.repository.save(tax);
    }

    async delete(id: string): Promise<void> {
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Billing Tax with ID ${id} not found`);
        }
    }
}
