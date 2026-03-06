import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, IsUUID, IsArray, ValidateNested } from 'class-validator';
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

export class CreateBillingServiceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    standardCode?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    internalCode: string;

    @ApiPropertyOptional({ type: [BillingTaxDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BillingTaxDto)
    taxes?: BillingTaxDto[];
}

export class UpdateBillingServiceDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    id?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional()
    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    standardCode?: string | null;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    internalCode?: string;

    @ApiPropertyOptional({ type: [BillingTaxDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BillingTaxDto)
    taxes?: BillingTaxDto[];
}
