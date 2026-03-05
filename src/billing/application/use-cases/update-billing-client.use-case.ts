import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BILLING_CLIENT_REPOSITORY } from '../../domain/repositories/billing-client.repository';
import type { BillingClientRepository } from '../../domain/repositories/billing-client.repository';
import { UpdateBillingClientDto } from '../dtos/update-billing-client.dto';
import type { BillingClient } from '../../domain/entities/billing-client.entity';

@Injectable()
export class UpdateBillingClientUseCase {
    constructor(
        @Inject(BILLING_CLIENT_REPOSITORY)
        private readonly clientRepository: BillingClientRepository,
    ) { }

    async execute(id: string, dto: UpdateBillingClientDto): Promise<BillingClient> {
        const client = await this.clientRepository.findById(id);
        if (!client) {
            throw new NotFoundException(`BillingClient with ID ${id} not found`);
        }
        return await this.clientRepository.update(id, dto);
    }
}
