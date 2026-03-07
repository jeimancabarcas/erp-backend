import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { GetBillingPaymentFrequenciesUseCase } from '../application/use-cases/get-billing-payment-frequencies.use-case';

@ApiTags('Billing Payment Frequencies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('billing-payment-frequencies')
export class BillingPaymentFrequenciesController {
    constructor(
        private readonly getUseCase: GetBillingPaymentFrequenciesUseCase,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all payment frequencies' })
    @ApiResponse({ status: 200, description: 'Return all payment frequencies.' })
    async findAll() {
        return await this.getUseCase.execute();
    }
}
