import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';
import { ProductResponseDto } from '../dtos/product-response.dto';

@Injectable()
export class GetProductsUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(): Promise<ProductResponseDto[]> {
        const products = await this.productRepository.findAll();
        return products.map(ProductResponseDto.fromDomain);
    }
}
