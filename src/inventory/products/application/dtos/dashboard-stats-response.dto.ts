export class DashboardStatsResponseDto {
    totalProducts: number;
    totalStock: number;
    recentEntries: number; // Sum of quantities? Or count of movements?
    recentExits: number;
    outOfStockCount: number;
    lowStockCount: number;
}
