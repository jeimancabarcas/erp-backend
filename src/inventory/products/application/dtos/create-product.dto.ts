import {
    IsString,
    IsNotEmpty,
    IsNumber,
    Min,
    IsOptional,
    IsArray,
    MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'MOU-INL-001', description: 'Código único del producto' })
    @IsString()
    @IsNotEmpty({ message: 'El SKU es obligatorio' })
    @MaxLength(50)
    sku: string;

    @ApiProperty({ example: 'Mouse Inalámbrico Logitech', description: 'Nombre del producto' })
    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MaxLength(150)
    name: string;

    @ApiPropertyOptional({ example: 'Mouse inalámbrico con receptor USB nano', description: 'Descripción del producto' })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;

    @ApiProperty({ example: 50, description: 'Unidades actuales en stock' })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    stock: number;

    @ApiPropertyOptional({ example: 5, description: 'Stock mínimo — genera alerta cuando baje de este nivel' })
    @IsNumber()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    minStock?: number;

    @ApiPropertyOptional({ example: 100, description: 'Stock máximo — límite de reposición' })
    @IsNumber()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    maxStock?: number;

    @ApiPropertyOptional({ example: ['uuid-1', 'uuid-2'], description: 'Lista de IDs de categorías del producto' })
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    categoryIds?: string[];
}
