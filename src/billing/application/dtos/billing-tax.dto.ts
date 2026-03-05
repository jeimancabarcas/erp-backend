import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBillingTaxDto {
    @ApiProperty({ example: 'IVA General', description: 'Name of the tax' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 19.00, description: 'Percentage rate of the tax (can be negative for retentions)' })
    @IsNumber()
    @IsNotEmpty()
    rate: number;
}

export class UpdateBillingTaxDto {
    @ApiPropertyOptional({ example: 'IVA Reducido', description: 'Name of the tax' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: 5.00, description: 'Percentage rate of the tax' })
    @IsNumber()
    @IsOptional()
    rate?: number;
}
