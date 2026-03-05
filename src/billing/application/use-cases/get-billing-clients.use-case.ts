import { Inject, Injectable } from '@nestjs/common';
import { BILLING_CLIENT_REPOSITORY } from '../../domain/repositories/billing-client.repository';
import type { BillingClientRepository } from '../../domain/repositories/billing-client.repository';
import type { BillingClient } from '../../domain/entities/billing-client.entity';

@Injectable()
export class GetBillingClientsUseCase {
    constructor(
        @Inject(BILLING_CLIENT_REPOSITORY)
        private readonly clientRepository: BillingClientRepository,
    ) { }

    async execute(): Promise<BillingClient[]> {
        return await this.clientRepository.findAll();
    }
}
