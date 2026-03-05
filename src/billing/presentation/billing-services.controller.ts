import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { CreateBillingServiceDto, UpdateBillingServiceDto } from '../application/dtos/billing-service.dto';
import { CreateBillingServiceUseCase } from '../application/use-cases/create-billing-service.use-case';
import { GetBillingServicesUseCase } from '../application/use-cases/get-billing-services.use-case';
import { UpdateBillingServiceUseCase } from '../application/use-cases/update-billing-service.use-case';
import { DeleteBillingServiceUseCase } from '../application/use-cases/delete-billing-service.use-case';

@ApiTags('Billing Services')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('billing-services')
export class BillingServicesController {
    constructor(
        private readonly createBillingServiceUseCase: CreateBillingServiceUseCase,
        private readonly getBillingServicesUseCase: GetBillingServicesUseCase,
        private readonly updateBillingServiceUseCase: UpdateBillingServiceUseCase,
        private readonly deleteBillingServiceUseCase: DeleteBillingServiceUseCase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new billing service' })
    @ApiResponse({ status: 201, description: 'The service has been successfully created.' })
    async create(@Body() createDto: CreateBillingServiceDto) {
        return await this.createBillingServiceUseCase.execute(createDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all billing services' })
    @ApiResponse({ status: 200, description: 'Return all billing services.' })
    async findAll() {
        return await this.getBillingServicesUseCase.execute();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a billing service' })
    @ApiResponse({ status: 200, description: 'The service has been successfully updated.' })
    async update(@Param('id') id: string, @Body() updateDto: UpdateBillingServiceDto) {
        return await this.updateBillingServiceUseCase.execute(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a billing service' })
    @ApiResponse({ status: 200, description: 'The service has been successfully deleted.' })
    async delete(@Param('id') id: string) {
        await this.deleteBillingServiceUseCase.execute(id);
        return { message: 'Service deleted successfully' };
    }
}
