import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { GetBillingPaymentTermsUseCase } from '../application/use-cases/get-billing-payment-terms.use-case';

@ApiTags('Billing Payment Terms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('billing-payment-terms')
export class BillingPaymentTermsController {
    constructor(
        private readonly getUseCase: GetBillingPaymentTermsUseCase,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all payment terms' })
    @ApiResponse({ status: 200, description: 'Return all payment terms.' })
    async findAll() {
        return await this.getUseCase.execute();
    }
}
