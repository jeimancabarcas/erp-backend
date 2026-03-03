import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';
import { MovementRepository } from '../../../movements/domain/movement.repository';
import { DashboardStatsResponseDto } from '../dtos/dashboard-stats-response.dto';

@Injectable()
export class GetDashboardStatsUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly movementRepository: MovementRepository,
    ) { }

    async execute(): Promise<DashboardStatsResponseDto> {
        const allProducts = await this.productRepository.findAll();
        const allMovements = await this.movementRepository.findAll();

        const now = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);

        const recentMovements = allMovements.filter(m => new Date(m.createdAt) >= thirtyDaysAgo);

        const totalStock = allProducts.reduce((acc, p) => acc + p.stock, 0);
        const outOfStock = allProducts.filter(p => p.stock === 0);
        const lowStock = allProducts.filter(p => p.stock > 0 && p.minStock !== null && p.stock < p.minStock);

        const recentEntries = recentMovements.filter(m => m.direction === 'entrada').length;
        const recentExits = recentMovements.filter(m => m.direction === 'salida').length;

        return {
            totalProducts: allProducts.length,
            totalStock: totalStock,
            recentEntries: recentEntries,
            recentExits: recentExits,
            outOfStockCount: outOfStock.length,
            lowStockCount: lowStock.length,
        };
    }
}
