import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '../../domain/product.entity';

export class ProductResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
    id: string;

    @ApiProperty({ example: 'MOU-INL-001' })
    sku: string;

    @ApiProperty({ example: 'Mouse Inalámbrico Logitech' })
    name: string;

    @ApiProperty({ example: 'Mouse inalámbrico con receptor USB nano' })
    description: string;

    @ApiProperty({ example: 50 })
    stock: number;

    @ApiPropertyOptional({ example: 5, nullable: true })
    minStock: number | null;

    @ApiPropertyOptional({ example: 100, nullable: true })
    maxStock: number | null;

    @ApiProperty({ example: ['Periféricos', 'Computo'] })
    categories: string[];

    @ApiProperty({ example: '2026-03-02T20:00:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-03-02T20:00:00.000Z' })
    updatedAt: Date;

    static fromDomain(product: Product): ProductResponseDto {
        const dto = new ProductResponseDto();
        dto.id = product.id;
        dto.sku = product.sku;
        dto.name = product.name;
        dto.description = product.description;
        dto.stock = product.stock;
        dto.minStock = product.minStock;
        dto.maxStock = product.maxStock;
        dto.categories = product.categories;
        dto.createdAt = product.createdAt;
        dto.updatedAt = product.updatedAt;
        return dto;
    }
}
