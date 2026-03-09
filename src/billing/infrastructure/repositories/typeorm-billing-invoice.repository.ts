import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingInvoice } from '../../domain/entities/billing-invoice.entity';
import { BillingInvoiceRepository } from '../../domain/repositories/billing-invoice.repository';

@Injectable()
export class TypeOrmBillingInvoiceRepository implements BillingInvoiceRepository {
    constructor(
        @InjectRepository(BillingInvoice)
        private readonly repository: Repository<BillingInvoice>
    ) { }

    async save(invoice: BillingInvoice): Promise<BillingInvoice> {
        return await this.repository.save(invoice);
    }

    async findAll(): Promise<BillingInvoice[]> {
        return await this.repository.find({
            relations: ['items', 'items.taxes'],
            order: { createdAt: 'DESC' }
        });
    }

    async findById(id: string): Promise<BillingInvoice | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ['items', 'items.taxes']
        });
    }

    async findLastInvoiceNumber(): Promise<string | null> {
        const lastInvoice = await this.repository.findOne({
            select: ['invoiceNumber'],
            order: { createdAt: 'DESC' },
            where: {}
        });
        return lastInvoice ? lastInvoice.invoiceNumber : null;
    }
}
