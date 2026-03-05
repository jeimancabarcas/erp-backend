import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
}

export class UpdateBillingServiceDto {
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
}
