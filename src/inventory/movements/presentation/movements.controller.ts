import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMovementUseCase } from '../application/use-cases/create-movement.use-case';
import { GetMovementsUseCase } from '../application/use-cases/get-movements.use-case';
import { CreateMovementDto } from '../application/dtos/create-movement.dto';
import { MovementResponseDto } from '../application/dtos/movement-response.dto';
import { Movement } from '../domain/movement.entity';

@ApiTags('movimientos')
@Controller('inventory/movements')
export class MovementsController {
    constructor(
        private readonly createMovementUseCase: CreateMovementUseCase,
        private readonly getMovementsUseCase: GetMovementsUseCase,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Registra un nuevo movimiento de inventario (y actualiza el stock)' })
    @ApiResponse({ status: 201, description: 'Movimiento creado', type: MovementResponseDto })
    async create(@Body() createMovementDto: CreateMovementDto): Promise<MovementResponseDto> {
        const movement = await this.createMovementUseCase.execute(createMovementDto);
        return this.toResponseDto(movement);
    }

    @Get()
    @ApiOperation({ summary: 'Obtiene todos los movimientos de inventario' })
    @ApiResponse({ status: 200, description: 'Listado de movimientos', type: [MovementResponseDto] })
    async findAll(): Promise<MovementResponseDto[]> {
        const movements = await this.getMovementsUseCase.execute();
        return movements.map(m => this.toResponseDto(m));
    }

    private toResponseDto(domainEntity: Movement): MovementResponseDto {
        return {
            id: domainEntity.id,
            date: domainEntity.date,
            productId: domainEntity.productId,
            productName: domainEntity.productName,
            productSku: domainEntity.productSku,
            direction: domainEntity.direction,
            type: domainEntity.type,
            quantity: domainEntity.quantity,
            reference: domainEntity.reference,
            notes: domainEntity.notes,
            createdAt: domainEntity.createdAt,
        };
    }
}
