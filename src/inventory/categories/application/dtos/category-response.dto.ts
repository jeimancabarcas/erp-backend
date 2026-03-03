import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '../../domain/category.entity';

export class CategoryResponseDto {
    @ApiProperty() id: string;
    @ApiProperty() name: string;
    @ApiPropertyOptional() description: string | null;
    @ApiProperty() createdAt: Date;
    @ApiProperty() updatedAt: Date;

    static fromDomain(c: Category): CategoryResponseDto {
        const dto = new CategoryResponseDto();
        dto.id = c.id;
        dto.name = c.name;
        dto.description = c.description;
        dto.createdAt = c.createdAt;
        dto.updatedAt = c.updatedAt;
        return dto;
    }
}
