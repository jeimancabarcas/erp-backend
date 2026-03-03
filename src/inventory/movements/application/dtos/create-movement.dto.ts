import {
    IsString,
    IsNotEmpty,
    IsNumber,
    Min,
    IsOptional,
    IsIn,
    IsDateString,
    MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovementDto {
    @ApiProperty({ example: '2026-03-01T10:00:00Z', description: 'Fecha del movimiento' })
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({ example: 'uuid-product-123', description: 'ID del producto' })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ example: 'entrada', description: 'Dirección del movimiento', enum: ['entrada', 'salida'] })
    @IsIn(['entrada', 'salida'])
    @IsNotEmpty()
    direction: 'entrada' | 'salida';

    @ApiProperty({ example: 'compra', description: 'Tipo de movimiento', enum: ['compra', 'venta', 'manual', 'sistema'] })
    @IsIn(['compra', 'venta', 'manual', 'sistema'])
    @IsNotEmpty()
    type: 'compra' | 'venta' | 'manual' | 'sistema';

    @ApiProperty({ example: 10, description: 'Cantidad movida' })
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    quantity: number;

    @ApiPropertyOptional({ example: 'FAC-2026-001', description: 'Referencia del movimiento (factura, orden, etc.)' })
    @IsString()
    @IsOptional()
    @MaxLength(150)
    reference?: string;

    @ApiPropertyOptional({ example: 'Ingreso por compra mensual', description: 'Notas adicionales' })
    @IsString()
    @IsOptional()
    notes?: string;
}
