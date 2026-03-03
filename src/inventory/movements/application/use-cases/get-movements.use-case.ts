import { Injectable } from '@nestjs/common';
import { MovementRepository } from '../../domain/movement.repository';
import { GetMovementsQueryDto } from '../dtos/get-movements-query.dto';
import { MovementsListResponseDto } from '../dtos/movements-list-response.dto';
import { MovementResponseDto } from '../dtos/movement-response.dto';
import { Movement } from '../../domain/movement.entity';

@Injectable()
export class GetMovementsUseCase {
    constructor(private readonly movementRepository: MovementRepository) { }

    async execute(query?: GetMovementsQueryDto): Promise<MovementsListResponseDto> {
        const { data, total } = await this.movementRepository.findAll(query);

        return {
            movements: data.map(m => this.toResponseDto(m)),
            total
        };
    }

    private toResponseDto(domainEntity: Movement): MovementResponseDto {
        return {
            id: domainEntity.id,
            date: domainEntity.date,
            productId: domainEntity.productId,
            productName: domainEntity.productName,
            productSku: domainEntity.productSku,
            direction: domainEntity.direction,
            type: domainEntity.type,
            quantity: domainEntity.quantity,
            reference: domainEntity.reference,
            notes: domainEntity.notes,
            createdAt: domainEntity.createdAt,
        };
    }
}
