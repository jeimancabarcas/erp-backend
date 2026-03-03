import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateMovementUseCase } from '../application/use-cases/create-movement.use-case';
import { GetMovementsUseCase } from '../application/use-cases/get-movements.use-case';
import { GetMovementsMonthlyStatsUseCase } from '../application/use-cases/get-movements-monthly-stats.use-case';
import { GetMovementsQueryDto } from '../application/dtos/get-movements-query.dto';
import { MovementsListResponseDto, MovementsStatsResponseDto } from '../application/dtos/movements-list-response.dto';
import { CreateMovementDto } from '../application/dtos/create-movement.dto';
import { MovementResponseDto } from '../application/dtos/movement-response.dto';

@ApiTags('Inventory - Movements')
@Controller('inventory/movements')
export class MovementsController {
    constructor(
        private readonly createMovementUseCase: CreateMovementUseCase,
        private readonly getMovementsUseCase: GetMovementsUseCase,
        private readonly getMovementsMonthlyStatsUseCase: GetMovementsMonthlyStatsUseCase,
    ) { }

    @Get('stats')
    @ApiOperation({ summary: 'Get current month movement statistics' })
    async getStats(): Promise<MovementsStatsResponseDto> {
        return this.getMovementsMonthlyStatsUseCase.execute();
    }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    @ApiOperation({ summary: 'Get movements with filtering, sorting and pagination' })
    async findAll(@Query() query: GetMovementsQueryDto): Promise<MovementsListResponseDto> {
        return this.getMovementsUseCase.execute(query);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new movement' })
    async create(@Body() createMovementDto: CreateMovementDto): Promise<MovementResponseDto> {
        return this.createMovementUseCase.execute(createMovementDto);
    }
}
