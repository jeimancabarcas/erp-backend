import { IsOptional, IsString, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetProductsQueryDto {
    @ApiPropertyOptional({ description: 'Filter by product name or SKU (partial, case-insensitive)' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ description: 'Field to sort by', enum: ['name', 'sku', 'stock', 'minStock', 'maxStock', 'createdAt'] })
    @IsOptional()
    @IsIn(['name', 'sku', 'stock', 'minStock', 'maxStock', 'createdAt'])
    sortBy?: 'name' | 'sku' | 'stock' | 'minStock' | 'maxStock' | 'createdAt';

    @ApiPropertyOptional({ description: 'Sort direction', enum: ['asc', 'desc'], default: 'asc' })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc';
}
