import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BILLING_CLIENT_REPOSITORY } from '../../domain/repositories/billing-client.repository';
import type { BillingClientRepository } from '../../domain/repositories/billing-client.repository';

@Injectable()
export class DeleteBillingClientUseCase {
    constructor(
        @Inject(BILLING_CLIENT_REPOSITORY)
        private readonly clientRepository: BillingClientRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const client = await this.clientRepository.findById(id);
        if (!client) {
            throw new NotFoundException(`BillingClient with ID ${id} not found`);
        }
        await this.clientRepository.delete(id);
    }
}
