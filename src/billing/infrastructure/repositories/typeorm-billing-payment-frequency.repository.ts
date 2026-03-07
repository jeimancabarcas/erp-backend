import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingPaymentFrequency } from '../../domain/entities/billing-payment-frequency.entity';
import { BillingPaymentFrequencyRepository } from '../../domain/repositories/billing-payment-frequency.repository';

@Injectable()
export class TypeOrmBillingPaymentFrequencyRepository implements BillingPaymentFrequencyRepository {
    constructor(
        @InjectRepository(BillingPaymentFrequency)
        private readonly repository: Repository<BillingPaymentFrequency>,
    ) { }

    async findAll(): Promise<BillingPaymentFrequency[]> {
        return await this.repository.find({
            where: { status: true },
            order: { days: 'ASC' }
        });
    }

    async findById(id: string): Promise<BillingPaymentFrequency | null> {
        return await this.repository.findOne({ where: { id } });
    }
}
