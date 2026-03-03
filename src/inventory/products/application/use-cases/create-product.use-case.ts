import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { Product } from '../../domain/product.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(dto: CreateProductDto): Promise<ProductResponseDto> {
        const now = new Date();
        const product = new Product(
            randomUUID(),
            dto.sku,
            dto.name,
            dto.description ?? '',
            dto.stock,
            dto.minStock ?? null,
            dto.maxStock ?? null,
            dto.categories,
            now,
            now,
        );

        const saved = await this.productRepository.save(product);
        return ProductResponseDto.fromDomain(saved);
    }
}
