import { Injectable } from '@nestjs/common';
import { MovementRepository } from '../../domain/movement.repository';
import { Movement } from '../../domain/movement.entity';

@Injectable()
export class GetMovementsUseCase {
    constructor(private readonly movementRepository: MovementRepository) { }

    async execute(): Promise<Movement[]> {
        return this.movementRepository.findAll();
    }
}
