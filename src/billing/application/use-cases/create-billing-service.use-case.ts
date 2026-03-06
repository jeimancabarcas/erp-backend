import { Injectable, Inject } from '@nestjs/common';
import { BillingService } from '../../domain/entities/billing-service.entity';
import type { BillingServiceRepository } from '../../domain/repositories/billing-service.repository';
import { BILLING_SERVICE_REPOSITORY } from '../../domain/repositories/billing-service.repository';
import { CreateBillingServiceDto } from '../dtos/billing-service.dto';

@Injectable()
export class CreateBillingServiceUseCase {
    constructor(
        @Inject(BILLING_SERVICE_REPOSITORY)
        private readonly repository: BillingServiceRepository,
    ) { }

    async execute(dto: CreateBillingServiceDto): Promise<BillingService> {
        return await this.repository.create({
            ...dto,
            taxes: dto.taxes?.map(t => ({ taxId: t.taxId, rate: t.rate })) as any
        });
    }
}
