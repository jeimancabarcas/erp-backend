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
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const recentMovements = allMovements.filter(m => new Date(m.createdAt) >= startOfMonth);

        const totalStock = allProducts.reduce((acc, p) => acc + p.stock, 0);
        const outOfStock = allProducts.filter(p => p.stock === 0);
        const lowStock = allProducts.filter(p => p.stock > 0 && p.minStock !== null && p.stock < p.minStock);

        const recentEntriesCount = recentMovements.filter(m => m.direction === 'entrada').length;
        const recentExitsCount = recentMovements.filter(m => m.direction === 'salida').length;

        // --- Movement Trend (Current Month) ---
        const trendMap = new Map<string, { entries: number, exits: number }>();

        // Initialize all days of the current month
        const daysInMonth = endOfMonth.getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(now.getFullYear(), now.getMonth(), i);
            const dateStr = date.toISOString().split('T')[0];
            trendMap.set(dateStr, { entries: 0, exits: 0 });
        }

        recentMovements.forEach(m => {
            const dateStr = new Date(m.createdAt).toISOString().split('T')[0];
            if (trendMap.has(dateStr)) {
                const dayData = trendMap.get(dateStr)!;
                if (m.direction === 'entrada') dayData.entries++;
                else if (m.direction === 'salida') dayData.exits++;
            }
        });

        const movementTrend = Array.from(trendMap.entries()).map(([date, data]) => ({
            date,
            entries: data.entries,
            exits: data.exits
        }));

        // --- Movement Type Distribution ---
        const typeMap = new Map<string, number>();
        allMovements.forEach(m => {
            const type = m.type || 'Manual';
            typeMap.set(type, (typeMap.get(type) || 0) + 1);
        });

        const movementTypeDistribution = Array.from(typeMap.entries()).map(([type, count]) => ({
            type,
            count
        }));

        return {
            totalProducts: allProducts.length,
            totalStock: totalStock,
            recentEntries: recentEntriesCount,
            recentExits: recentExitsCount,
            outOfStockCount: outOfStock.length,
            lowStockCount: lowStock.length,
            movementTrend,
            movementTypeDistribution
        };
    }
}
