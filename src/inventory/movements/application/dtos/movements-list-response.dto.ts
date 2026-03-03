import { ApiProperty } from '@nestjs/swagger';
import { MovementResponseDto } from './movement-response.dto';

export class MovementsStatsResponseDto {
    @ApiProperty({ description: 'Total entradas del mes actual' })
    totalEntradas: number;

    @ApiProperty({ description: 'Total salidas del mes actual' })
    totalSalidas: number;

    @ApiProperty({ description: 'Total movimientos del mes actual' })
    totalMovements: number;
}

export class MovementsListResponseDto {
    @ApiProperty({ type: [MovementResponseDto] })
    movements: MovementResponseDto[];

    @ApiProperty({ description: 'Total number of items for pagination' })
    total: number;
}
