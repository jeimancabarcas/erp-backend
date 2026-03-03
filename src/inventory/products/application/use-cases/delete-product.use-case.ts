import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';

@Injectable()
export class DeleteProductUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(id: string): Promise<void> {
        const existing = await this.productRepository.findById(id);
        if (!existing) {
            throw new NotFoundException(`Producto con id "${id}" no encontrado`);
        }
        await this.productRepository.delete(id);
    }
}
