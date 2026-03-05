import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingPaymentMethod } from '../../domain/entities/billing-payment-method.entity';
import { BillingPaymentMethodRepository } from '../../domain/repositories/billing-payment-method.repository';

@Injectable()
export class TypeOrmBillingPaymentMethodRepository implements BillingPaymentMethodRepository {
    constructor(
        @InjectRepository(BillingPaymentMethod)
        private readonly repository: Repository<BillingPaymentMethod>,
    ) { }

    async create(paymentMethodData: Partial<BillingPaymentMethod>): Promise<BillingPaymentMethod> {
        const paymentMethod = this.repository.create(paymentMethodData);
        return await this.repository.save(paymentMethod);
    }

    async findAll(): Promise<BillingPaymentMethod[]> {
        return await this.repository.find({
            order: { createdAt: 'DESC' }
        });
    }

    async findById(id: string): Promise<BillingPaymentMethod | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async update(id: string, paymentMethodData: Partial<BillingPaymentMethod>): Promise<BillingPaymentMethod> {
        const paymentMethod = await this.findById(id);
        if (!paymentMethod) {
            throw new NotFoundException(`Billing Payment Method with ID ${id} not found`);
        }

        Object.assign(paymentMethod, paymentMethodData);
        return await this.repository.save(paymentMethod);
    }

    async delete(id: string): Promise<void> {
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Billing Payment Method with ID ${id} not found`);
        }
    }
}
