import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { CreateBillingTaxDto, UpdateBillingTaxDto } from '../application/dtos/billing-tax.dto';
import { CreateBillingTaxUseCase } from '../application/use-cases/create-billing-tax.use-case';
import { GetBillingTaxesUseCase } from '../application/use-cases/get-billing-taxes.use-case';
import { UpdateBillingTaxUseCase } from '../application/use-cases/update-billing-tax.use-case';
import { DeleteBillingTaxUseCase } from '../application/use-cases/delete-billing-tax.use-case';

@ApiTags('Billing Taxes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('billing-taxes')
export class BillingTaxesController {
    constructor(
        private readonly createBillingTaxUseCase: CreateBillingTaxUseCase,
        private readonly getBillingTaxesUseCase: GetBillingTaxesUseCase,
        private readonly updateBillingTaxUseCase: UpdateBillingTaxUseCase,
        private readonly deleteBillingTaxUseCase: DeleteBillingTaxUseCase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new billing tax' })
    @ApiResponse({ status: 201, description: 'The tax has been successfully created.' })
    async create(@Body() createDto: CreateBillingTaxDto) {
        return await this.createBillingTaxUseCase.execute(createDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all billing taxes' })
    @ApiResponse({ status: 200, description: 'Return all billing taxes.' })
    async findAll() {
        return await this.getBillingTaxesUseCase.execute();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a billing tax' })
    @ApiResponse({ status: 200, description: 'The tax has been successfully updated.' })
    async update(@Param('id') id: string, @Body() updateDto: UpdateBillingTaxDto) {
        return await this.updateBillingTaxUseCase.execute(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a billing tax' })
    @ApiResponse({ status: 200, description: 'The tax has been successfully deleted.' })
    async delete(@Param('id') id: string) {
        await this.deleteBillingTaxUseCase.execute(id);
        return { message: 'Tax deleted successfully' };
    }
}
