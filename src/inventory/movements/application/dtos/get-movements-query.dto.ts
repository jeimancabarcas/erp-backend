import { IsOptional, IsString, IsIn, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetMovementsQueryDto {
    @ApiPropertyOptional({ description: 'Search term for product name, sku or reference' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ description: 'Movement direction', enum: ['entrada', 'salida'] })
    @IsOptional()
    @IsIn(['entrada', 'salida'])
    direction?: 'entrada' | 'salida';

    @ApiPropertyOptional({ description: 'Movement type', enum: ['compra', 'venta', 'manual', 'sistema'] })
    @IsOptional()
    @IsIn(['compra', 'venta', 'manual', 'sistema'])
    type?: 'compra' | 'venta' | 'manual' | 'sistema';

    @ApiPropertyOptional({ description: 'Field to sort by', default: 'date' })
    @IsOptional()
    @IsIn(['date', 'productName', 'productSku', 'quantity', 'createdAt'])
    sortBy?: 'date' | 'productName' | 'productSku' | 'quantity' | 'createdAt';

    @ApiPropertyOptional({ description: 'Sort direction', enum: ['asc', 'desc'], default: 'desc' })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc';

    @ApiPropertyOptional({ description: 'Page number for pagination', default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number;

    @ApiPropertyOptional({ description: 'Number of items per page for pagination', default: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number;
}
