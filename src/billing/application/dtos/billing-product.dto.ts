import { IsString, IsNumber, IsBoolean, IsOptional, Min, IsUUID, ValidateIf, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BillingTaxDto {
    @ApiProperty()
    @IsUUID()
    taxId: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    rate: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    productId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    serviceId?: string;
}

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
    @ValidateIf((o, v) => v !== null)
    @IsUUID()
    inventoryProductId?: string | null;

    @ApiPropertyOptional({ type: [BillingTaxDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BillingTaxDto)
    taxes?: BillingTaxDto[];
}

export class UpdateBillingProductDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    id?: string;

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
    @ValidateIf((o, v) => v !== null)
    @IsUUID()
    inventoryProductId?: string | null;

    @ApiPropertyOptional({ type: [BillingTaxDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BillingTaxDto)
    taxes?: BillingTaxDto[];
}
