import { ConflictException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { Product } from '../../domain/product.entity';
import { MovementRepository } from '../../../movements/domain/movement.repository';
import { Movement } from '../../../movements/domain/movement.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly movementRepository: MovementRepository,
    ) { }

    async execute(dto: CreateProductDto): Promise<ProductResponseDto> {
        // Check for duplicate SKU
        const existing = await this.productRepository.findBySku(dto.sku);
        if (existing) {
            throw new ConflictException({
                message: `El SKU '${dto.sku}' ya está en uso por otro producto`,
                errorCode: 'PRODUCT_SKU_DUPLICATE',
                field: 'sku',
            });
        }

        const now = new Date();
        const product = new Product(
            randomUUID(),
            dto.sku,
            dto.name,
            dto.description ?? '',
            dto.stock,
            dto.minStock ?? null,
            dto.maxStock ?? null,
            dto.categoryIds ? dto.categoryIds.map(id => ({ id, name: '' })) : [],
            now,
            now,
        );

        const saved = await this.productRepository.save(product);

        // Create initial movement
        const movement: Movement = {
            id: '',
            date: new Date(),
            productId: saved.id,
            direction: 'entrada',
            type: 'sistema',
            quantity: saved.stock,
            reference: 'INITIAL_STOCK',
            notes: 'Creacion del producto',
            createdAt: new Date(),
        };
        await this.movementRepository.create(movement);

        return ProductResponseDto.fromDomain(saved);
    }
}
