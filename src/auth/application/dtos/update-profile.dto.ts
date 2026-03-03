import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
    @ApiProperty({ example: 'Markarn Doe', required: false })
    @IsOptional()
    @IsString()
    fullName?: string;

    @ApiProperty({ example: '814 Howard Street, 120065, India', required: false })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ example: '+91 12345 65478', required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ example: 'Mark Doe', required: false })
    @IsOptional()
    @IsString()
    displayName?: string;
}
