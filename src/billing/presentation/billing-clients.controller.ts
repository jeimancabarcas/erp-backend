import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateBillingClientDto } from '../application/dtos/create-billing-client.dto';
import { UpdateBillingClientDto } from '../application/dtos/update-billing-client.dto';
import { CreateBillingClientUseCase } from '../application/use-cases/create-billing-client.use-case';
import { GetBillingClientsUseCase } from '../application/use-cases/get-billing-clients.use-case';
import { UpdateBillingClientUseCase } from '../application/use-cases/update-billing-client.use-case';
import { DeleteBillingClientUseCase } from '../application/use-cases/delete-billing-client.use-case';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth.guard';

@Controller('billing-clients')
@UseGuards(JwtAuthGuard)
export class BillingClientsController {
    constructor(
        private readonly createClientUseCase: CreateBillingClientUseCase,
        private readonly getClientsUseCase: GetBillingClientsUseCase,
        private readonly updateClientUseCase: UpdateBillingClientUseCase,
        private readonly deleteClientUseCase: DeleteBillingClientUseCase,
    ) { }

    @Post()
    async create(@Body() createDto: CreateBillingClientDto) {
        return await this.createClientUseCase.execute(createDto);
    }

    @Get()
    async findAll() {
        return await this.getClientsUseCase.execute();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDto: UpdateBillingClientDto) {
        return await this.updateClientUseCase.execute(id, updateDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.deleteClientUseCase.execute(id);
    }
}
