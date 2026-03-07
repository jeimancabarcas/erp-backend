import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBillingPaymentTermDto {
    @ApiProperty({ example: '30 días', description: 'Name of the term' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 30, description: 'Number of days for this term' })
    @IsNumber()
    @IsNotEmpty()
    days: number;
}

export class UpdateBillingPaymentTermDto {
    @ApiPropertyOptional({ example: '45 días', description: 'Name of the term' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: 45, description: 'Number of days for this term' })
    @IsNumber()
    @IsOptional()
    days?: number;
}
