import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { Product } from '../../domain/product.entity';

@Injectable()
export class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(id: string, dto: UpdateProductDto): Promise<ProductResponseDto> {
        const existing = await this.productRepository.findById(id);
        if (!existing) {
            throw new NotFoundException(`Producto con id "${id}" no encontrado`);
        }

        // If SKU is being changed, check that the new SKU isn't taken by another product
        if (dto.sku && dto.sku !== existing.sku) {
            const conflict = await this.productRepository.findBySku(dto.sku);
            if (conflict) {
                throw new ConflictException({
                    message: `El SKU '${dto.sku}' ya está en uso por otro producto`,
                    errorCode: 'PRODUCT_SKU_DUPLICATE',
                    field: 'sku',
                });
            }
        }

        const updated = new Product(
            existing.id,
            dto.sku ?? existing.sku,
            dto.name ?? existing.name,
            dto.description ?? existing.description,
            dto.stock ?? existing.stock,
            dto.minStock !== undefined ? dto.minStock : existing.minStock,
            dto.maxStock !== undefined ? dto.maxStock : existing.maxStock,
            dto.categoryIds ? dto.categoryIds.map(id => ({ id, name: '' })) : existing.categories,
            existing.createdAt,
            new Date(),
        );

        const saved = await this.productRepository.save(updated);
        return ProductResponseDto.fromDomain(saved);
    }
}
