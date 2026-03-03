import {
    IsString,
    IsNumber,
    Min,
    IsOptional,
    IsArray,
    MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiPropertyOptional({ example: 'MOU-INL-002', description: 'Nuevo SKU del producto' })
    @IsString()
    @IsOptional()
    @MaxLength(50)
    sku?: string;

    @ApiPropertyOptional({ example: 'Mouse Inalámbrico Pro', description: 'Nuevo nombre del producto' })
    @IsString()
    @IsOptional()
    @MaxLength(150)
    name?: string;

    @ApiPropertyOptional({ example: 'Mouse inalámbrico ergonómico de alta precisión' })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;

    @ApiPropertyOptional({ example: 75 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    stock?: number;

    @ApiPropertyOptional({ example: 10 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    minStock?: number;

    @ApiPropertyOptional({ example: 150 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    maxStock?: number;

    @ApiPropertyOptional({ example: ['Periféricos', 'Computo'] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    categories?: string[];
}
