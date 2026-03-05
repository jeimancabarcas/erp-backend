import { Inject, Injectable } from '@nestjs/common';
import { BILLING_CLIENT_REPOSITORY } from '../../domain/repositories/billing-client.repository';
import type { BillingClientRepository } from '../../domain/repositories/billing-client.repository';
import { CreateBillingClientDto } from '../dtos/create-billing-client.dto';
import type { BillingClient } from '../../domain/entities/billing-client.entity';

@Injectable()
export class CreateBillingClientUseCase {
    constructor(
        @Inject(BILLING_CLIENT_REPOSITORY)
        private readonly clientRepository: BillingClientRepository,
    ) { }

    async execute(dto: CreateBillingClientDto): Promise<BillingClient> {
        return await this.clientRepository.create(dto);
    }
}
