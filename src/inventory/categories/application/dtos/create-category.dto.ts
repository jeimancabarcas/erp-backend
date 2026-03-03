import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({ example: 'Electrónica' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiPropertyOptional({ example: 'Productos electrónicos y gadgets' })
    @IsOptional()
    @IsString()
    description?: string;
}
