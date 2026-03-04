import { IsOptional, IsString, IsIn, IsInt, Min, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';
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

    @ApiPropertyOptional({ description: 'Page number', default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Number of items per page', default: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @ApiPropertyOptional({ description: 'Exclude products already linked to billing products' })
    @IsOptional()
    @Transform(({ value }) => value === 'true' || value === true)
    @IsBoolean()
    excludeBillingLinked?: boolean;
}
