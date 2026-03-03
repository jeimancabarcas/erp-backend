import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { GetProductsQueryDto } from '../dtos/get-products-query.dto';
import { ProductsListResponseDto } from '../dtos/products-list-response.dto';

@Injectable()
export class GetProductsUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(query?: GetProductsQueryDto): Promise<ProductsListResponseDto> {
        const { data, total } = await this.productRepository.findAll(query);
        return {
            products: data.map(ProductResponseDto.fromDomain),
            total
        };
    }
}
