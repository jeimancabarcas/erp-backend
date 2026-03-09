import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBillingInvoiceUseCase } from '../application/use-cases/create-billing-invoice.use-case';
import { CreateBillingInvoiceDto } from '../application/dtos/billing-invoice.dto';
import { BillingInvoiceRepository } from '../domain/repositories/billing-invoice.repository';
import { ApiResponse } from '../../common/dto/api-response.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Billing Invoices')
@Controller('billing-invoices')
export class BillingInvoicesController {
    constructor(
        private readonly createInvoiceUseCase: CreateBillingInvoiceUseCase,
        private readonly repository: BillingInvoiceRepository,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new invoice snapshot' })
    async create(@Body() dto: CreateBillingInvoiceDto) {
        return await this.createInvoiceUseCase.execute(dto);
    }

    @Get()
    @ApiOperation({ summary: 'List all invoice snapshots' })
    async findAll() {
        return await this.repository.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get invoice snapshot by ID' })
    async findById(@Param('id') id: string) {
        return await this.repository.findById(id);
    }
}
