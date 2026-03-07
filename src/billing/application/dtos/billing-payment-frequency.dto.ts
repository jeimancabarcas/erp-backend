import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBillingPaymentFrequencyDto {
    @ApiProperty({ example: 'Mensual', description: 'Name of the frequency' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 30, description: 'Number of days for this frequency' })
    @IsNumber()
    @IsNotEmpty()
    days: number;
}

export class UpdateBillingPaymentFrequencyDto {
    @ApiPropertyOptional({ example: 'Bimensual', description: 'Name of the frequency' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: 60, description: 'Number of days for this frequency' })
    @IsNumber()
    @IsOptional()
    days?: number;
}
