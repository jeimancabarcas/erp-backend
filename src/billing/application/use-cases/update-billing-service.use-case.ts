import { Injectable, Inject } from '@nestjs/common';
import { BillingService } from '../../domain/entities/billing-service.entity';
import type { BillingServiceRepository } from '../../domain/repositories/billing-service.repository';
import { BILLING_SERVICE_REPOSITORY } from '../../domain/repositories/billing-service.repository';
import { UpdateBillingServiceDto } from '../dtos/billing-service.dto';

@Injectable()
export class UpdateBillingServiceUseCase {
    constructor(
        @Inject(BILLING_SERVICE_REPOSITORY)
        private readonly repository: BillingServiceRepository,
    ) { }

    async execute(id: string, dto: UpdateBillingServiceDto): Promise<BillingService> {
        return await this.repository.update(id, dto);
    }
}
