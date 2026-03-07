import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { GetBillingPaymentTermsUseCase } from '../application/use-cases/get-billing-payment-terms.use-case';
import { CreateBillingPaymentTermUseCase } from '../application/use-cases/create-billing-payment-term.use-case';
import { UpdateBillingPaymentTermUseCase } from '../application/use-cases/update-billing-payment-term.use-case';
import { DeleteBillingPaymentTermUseCase } from '../application/use-cases/delete-billing-payment-term.use-case';
import { CreateBillingPaymentTermDto, UpdateBillingPaymentTermDto } from '../application/dtos/billing-payment-term.dto';

@ApiTags('Billing Payment Terms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('billing-payment-terms')
export class BillingPaymentTermsController {
    constructor(
        private readonly getUseCase: GetBillingPaymentTermsUseCase,
        private readonly createUseCase: CreateBillingPaymentTermUseCase,
        private readonly updateUseCase: UpdateBillingPaymentTermUseCase,
        private readonly deleteUseCase: DeleteBillingPaymentTermUseCase,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all payment terms' })
    @ApiResponse({ status: 200, description: 'Return all payment terms.' })
    async findAll() {
        return await this.getUseCase.execute();
    }

    @Post()
    @ApiOperation({ summary: 'Create a payment term' })
    @ApiResponse({ status: 201, description: 'The payment term has been successfully created.' })
    async create(@Body() createDto: CreateBillingPaymentTermDto) {
        return await this.createUseCase.execute(createDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a payment term' })
    @ApiResponse({ status: 200, description: 'The payment term has been successfully updated.' })
    async update(@Param('id') id: string, @Body() updateDto: UpdateBillingPaymentTermDto) {
        return await this.updateUseCase.execute(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a payment term' })
    @ApiResponse({ status: 200, description: 'The payment term has been successfully deleted.' })
    async delete(@Param('id') id: string) {
        return await this.deleteUseCase.execute(id);
    }
}
