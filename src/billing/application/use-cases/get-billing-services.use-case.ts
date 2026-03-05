import { Injectable, Inject } from '@nestjs/common';
import { BillingService } from '../../domain/entities/billing-service.entity';
import type { BillingServiceRepository } from '../../domain/repositories/billing-service.repository';
import { BILLING_SERVICE_REPOSITORY } from '../../domain/repositories/billing-service.repository';

@Injectable()
export class GetBillingServicesUseCase {
    constructor(
        @Inject(BILLING_SERVICE_REPOSITORY)
        private readonly repository: BillingServiceRepository,
    ) { }

    async execute(): Promise<BillingService[]> {
        return await this.repository.findAll();
    }
}
