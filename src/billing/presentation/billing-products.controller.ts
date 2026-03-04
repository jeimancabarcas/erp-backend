import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';
import { CreateBillingProductUseCase } from '../application/use-cases/create-billing-product.use-case';
import { GetBillingProductsUseCase } from '../application/use-cases/get-billing-products.use-case';
import { UpdateBillingProductUseCase } from '../application/use-cases/update-billing-product.use-case';
import { DeleteBillingProductUseCase } from '../application/use-cases/delete-billing-product.use-case';
import { CreateBillingProductDto, UpdateBillingProductDto } from '../application/dtos/billing-product.dto';

@ApiTags('billing-products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('billing-products')
export class BillingProductsController {
    constructor(
        private readonly createBillingProductUseCase: CreateBillingProductUseCase,
        private readonly getBillingProductsUseCase: GetBillingProductsUseCase,
        private readonly updateBillingProductUseCase: UpdateBillingProductUseCase,
        private readonly deleteBillingProductUseCase: DeleteBillingProductUseCase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new billing product' })
    create(@Body() createBillingProductDto: CreateBillingProductDto) {
        return this.createBillingProductUseCase.execute(createBillingProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all billing products' })
    findAll() {
        return this.getBillingProductsUseCase.execute();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a billing product' })
    update(@Param('id') id: string, @Body() updateBillingProductDto: UpdateBillingProductDto) {
        return this.updateBillingProductUseCase.execute(id, updateBillingProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a billing product' })
    remove(@Param('id') id: string) {
        return this.deleteBillingProductUseCase.execute(id);
    }
}
