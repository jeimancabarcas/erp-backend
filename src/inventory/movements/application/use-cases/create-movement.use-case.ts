import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { MovementRepository } from '../../domain/movement.repository';
import { ProductRepository } from '../../../products/domain/product.repository';
import { Product } from '../../../products/domain/product.entity';
import { Movement } from '../../domain/movement.entity';
import { CreateMovementDto } from '../dtos/create-movement.dto';

@Injectable()
export class CreateMovementUseCase {
    constructor(
        private readonly movementRepository: MovementRepository,
        private readonly productRepository: ProductRepository,
    ) { }

    async execute(dto: CreateMovementDto): Promise<Movement> {
        // 1. Validate Product exists
        const product = await this.productRepository.findById(dto.productId);
        if (!product) {
            throw new NotFoundException(`Product with ID ${dto.productId} not found`);
        }

        // 2. Validate Stock and calculate new balance
        let newStock = product.stock;
        if (dto.direction === 'entrada') {
            newStock += dto.quantity;
        } else if (dto.direction === 'salida') {
            if (product.stock < dto.quantity) {
                throw new BadRequestException({
                    message: `Stock insuficiente. Disponible: ${product.stock}, Requerido: ${dto.quantity}`,
                    errorCode: 'INSUFFICIENT_STOCK',
                    currentStock: product.stock
                });
            }
            newStock -= dto.quantity;
        }

        // 3. Create the movement record
        const movement: Movement = {
            id: '', // Will be assigned by DB
            date: new Date(dto.date),
            productId: dto.productId,
            direction: dto.direction,
            type: dto.type,
            quantity: dto.quantity,
            reference: dto.reference || '',
            notes: dto.notes || '',
            createdAt: new Date(),
        };

        const savedMovement = await this.movementRepository.create(movement);

        // 4. Update Product Stock
        const updatedProduct = new Product(
            product.id,
            product.sku,
            product.name,
            product.description,
            newStock,
            product.minStock,
            product.maxStock,
            product.categories,
            product.createdAt,
            new Date(),
        );

        await this.productRepository.save(updatedProduct);

        return savedMovement;
    }
}
