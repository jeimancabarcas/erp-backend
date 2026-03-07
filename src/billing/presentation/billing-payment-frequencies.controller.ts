import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { GetBillingPaymentFrequenciesUseCase } from '../application/use-cases/get-billing-payment-frequencies.use-case';
import { CreateBillingPaymentFrequencyUseCase } from '../application/use-cases/create-billing-payment-frequency.use-case';
import { UpdateBillingPaymentFrequencyUseCase } from '../application/use-cases/update-billing-payment-frequency.use-case';
import { DeleteBillingPaymentFrequencyUseCase } from '../application/use-cases/delete-billing-payment-frequency.use-case';
import { CreateBillingPaymentFrequencyDto, UpdateBillingPaymentFrequencyDto } from '../application/dtos/billing-payment-frequency.dto';

@ApiTags('Billing Payment Frequencies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('billing-payment-frequencies')
export class BillingPaymentFrequenciesController {
    constructor(
        private readonly getUseCase: GetBillingPaymentFrequenciesUseCase,
        private readonly createUseCase: CreateBillingPaymentFrequencyUseCase,
        private readonly updateUseCase: UpdateBillingPaymentFrequencyUseCase,
        private readonly deleteUseCase: DeleteBillingPaymentFrequencyUseCase,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all payment frequencies' })
    @ApiResponse({ status: 200, description: 'Return all payment frequencies.' })
    async findAll() {
        return await this.getUseCase.execute();
    }

    @Post()
    @ApiOperation({ summary: 'Create a payment frequency' })
    @ApiResponse({ status: 201, description: 'The payment frequency has been successfully created.' })
    async create(@Body() createDto: CreateBillingPaymentFrequencyDto) {
        return await this.createUseCase.execute(createDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a payment frequency' })
    @ApiResponse({ status: 200, description: 'The payment frequency has been successfully updated.' })
    async update(@Param('id') id: string, @Body() updateDto: UpdateBillingPaymentFrequencyDto) {
        return await this.updateUseCase.execute(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a payment frequency' })
    @ApiResponse({ status: 200, description: 'The payment frequency has been successfully deleted.' })
    async delete(@Param('id') id: string) {
        return await this.deleteUseCase.execute(id);
    }
}
