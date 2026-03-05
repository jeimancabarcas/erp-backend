import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { CreateBillingPaymentMethodDto, UpdateBillingPaymentMethodDto } from '../application/dtos/billing-payment-method.dto';
import { CreateBillingPaymentMethodUseCase } from '../application/use-cases/create-billing-payment-method.use-case';
import { GetBillingPaymentMethodsUseCase } from '../application/use-cases/get-billing-payment-methods.use-case';
import { UpdateBillingPaymentMethodUseCase } from '../application/use-cases/update-billing-payment-method.use-case';
import { DeleteBillingPaymentMethodUseCase } from '../application/use-cases/delete-billing-payment-method.use-case';

@ApiTags('Billing Payment Methods')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('billing-payment-methods')
export class BillingPaymentMethodsController {
    constructor(
        private readonly createBillingPaymentMethodUseCase: CreateBillingPaymentMethodUseCase,
        private readonly getBillingPaymentMethodsUseCase: GetBillingPaymentMethodsUseCase,
        private readonly updateBillingPaymentMethodUseCase: UpdateBillingPaymentMethodUseCase,
        private readonly deleteBillingPaymentMethodUseCase: DeleteBillingPaymentMethodUseCase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new payment method' })
    @ApiResponse({ status: 201, description: 'The payment method has been successfully created.' })
    async create(@Body() createDto: CreateBillingPaymentMethodDto) {
        return await this.createBillingPaymentMethodUseCase.execute(createDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all payment methods' })
    @ApiResponse({ status: 200, description: 'Return all payment methods.' })
    async findAll() {
        return await this.getBillingPaymentMethodsUseCase.execute();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a payment method' })
    @ApiResponse({ status: 200, description: 'The payment method has been successfully updated.' })
    async update(@Param('id') id: string, @Body() updateDto: UpdateBillingPaymentMethodDto) {
        return await this.updateBillingPaymentMethodUseCase.execute(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a payment method' })
    @ApiResponse({ status: 200, description: 'The payment method has been successfully deleted.' })
    async delete(@Param('id') id: string) {
        await this.deleteBillingPaymentMethodUseCase.execute(id);
        return { message: 'Payment method deleted successfully' };
    }
}
