import { IsString, IsNumber, IsBoolean, IsOptional, Min, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBillingProductDto {
    @ApiPropertyOptional()
    @ValidateIf(o => !o.inventoryProductId)
    @IsString()
    name?: string | null;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    standardCode?: string | null;

    @ApiPropertyOptional()
    @ValidateIf(o => !o.inventoryProductId)
    @IsString()
    internalCode?: string | null;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    inventoryProductId?: string;
}

export class UpdateBillingProductDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string | null;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    standardCode?: string | null;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    internalCode?: string | null;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    inventoryProductId?: string;
}
