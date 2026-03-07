import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingPaymentTerm } from '../../domain/entities/billing-payment-term.entity';
import { BillingPaymentTermRepository } from '../../domain/repositories/billing-payment-term.repository';

@Injectable()
export class TypeOrmBillingPaymentTermRepository implements BillingPaymentTermRepository {
    constructor(
        @InjectRepository(BillingPaymentTerm)
        private readonly repository: Repository<BillingPaymentTerm>,
    ) { }

    async findAll(): Promise<BillingPaymentTerm[]> {
        return await this.repository.find({
            where: { status: true },
            order: { days: 'ASC' }
        });
    }

    async findById(id: string): Promise<BillingPaymentTerm | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async save(term: BillingPaymentTerm): Promise<BillingPaymentTerm> {
        return await this.repository.save(term);
    }

    async delete(id: string): Promise<void> {
        await this.repository.update(id, { status: false });
    }
}
