import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MovementResponseDto {
    @ApiProperty({ example: 'uuid-123', description: 'ID del movimiento' })
    id: string;

    @ApiProperty({ example: '2026-03-01T10:00:00Z', description: 'Fecha del movimiento' })
    date: Date;

    @ApiProperty({ example: 'uuid-product-123', description: 'ID del producto' })
    productId: string;

    @ApiPropertyOptional({ example: 'Camiseta Roja', description: 'Nombre del producto' })
    productName?: string;

    @ApiPropertyOptional({ example: 'PROD-001', description: 'SKU del producto' })
    productSku?: string;

    @ApiProperty({ example: 'entrada', description: 'Dirección del movimiento', enum: ['entrada', 'salida'] })
    direction: 'entrada' | 'salida';

    @ApiProperty({ example: 'compra', description: 'Tipo de movimiento', enum: ['compra', 'venta', 'manual', 'sistema'] })
    type: 'compra' | 'venta' | 'manual' | 'sistema';

    @ApiProperty({ example: 10, description: 'Cantidad movida' })
    quantity: number;

    @ApiPropertyOptional({ example: 'FAC-2026-001', description: 'Referencia del movimiento' })
    reference?: string;

    @ApiPropertyOptional({ example: 'Notas', description: 'Notas adicionales' })
    notes?: string;

    @ApiProperty({ example: '2026-03-01T10:00:00Z', description: 'Fecha de creación del registro' })
    createdAt: Date;
}
