import { Injectable, Inject } from '@nestjs/common';
import type { BillingServiceRepository } from '../../domain/repositories/billing-service.repository';
import { BILLING_SERVICE_REPOSITORY } from '../../domain/repositories/billing-service.repository';

@Injectable()
export class DeleteBillingServiceUseCase {
    constructor(
        @Inject(BILLING_SERVICE_REPOSITORY)
        private readonly repository: BillingServiceRepository,
    ) { }

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
