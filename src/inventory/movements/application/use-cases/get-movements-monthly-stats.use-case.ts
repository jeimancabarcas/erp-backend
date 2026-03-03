import { Injectable } from '@nestjs/common';
import { MovementRepository } from '../../domain/movement.repository';
import { MovementsStatsResponseDto } from '../dtos/movements-list-response.dto';

@Injectable()
export class GetMovementsMonthlyStatsUseCase {
    constructor(private readonly movementRepository: MovementRepository) { }

    async execute(): Promise<MovementsStatsResponseDto> {
        // Fetch ALL movements to calculate current month stats
        // In a real scenario, this should be a more efficient query or an aggregate
        const { data: allMovements } = await this.movementRepository.findAll({ limit: 10000 }); // Large limit to get roughly "all" for now, or just implement a better repo method

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const monthlyMovements = allMovements.filter(m => new Date(m.createdAt) >= startOfMonth);

        return {
            totalEntradas: monthlyMovements.filter(m => m.direction === 'entrada').reduce((acc, m) => acc + m.quantity, 0),
            totalSalidas: monthlyMovements.filter(m => m.direction === 'salida').reduce((acc, m) => acc + m.quantity, 0),
            totalMovements: monthlyMovements.length
        };
    }
}
