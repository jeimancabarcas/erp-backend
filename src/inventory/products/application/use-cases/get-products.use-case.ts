import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { GetProductsQueryDto } from '../dtos/get-products-query.dto';

@Injectable()
export class GetProductsUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(query?: GetProductsQueryDto): Promise<ProductResponseDto[]> {
        const products = await this.productRepository.findAll(query);
        return products.map(ProductResponseDto.fromDomain);
    }
}
