import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBillingPaymentMethodDto {
    @ApiProperty({ example: 'Transferencia Bancaria', description: 'Name of the payment method' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: 'Banco A Cta: 123456', description: 'Additional details or account numbers' })
    @IsString()
    @IsOptional()
    details?: string;

    @ApiPropertyOptional({ example: true, description: 'Whether this payment method is active' })
    @IsBoolean()
    @IsOptional()
    status?: boolean;
}

export class UpdateBillingPaymentMethodDto {
    @ApiPropertyOptional({ example: 'Transferencia Bancaria', description: 'Name of the payment method' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: 'Banco A Cta: 123456', description: 'Additional details or account numbers' })
    @IsString()
    @IsOptional()
    details?: string;

    @ApiPropertyOptional({ example: false, description: 'Whether this payment method is active' })
    @IsBoolean()
    @IsOptional()
    status?: boolean;
}
