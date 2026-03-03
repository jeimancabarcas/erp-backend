import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from './product-response.dto';

export class StockAlertResponseDto {
    @ApiProperty({ description: 'Total number of products with zero stock' })
    outOfStockCount: number;

    @ApiProperty({ description: 'Total number of products with low stock (below minStock)' })
    lowStockCount: number;

    @ApiProperty({ description: 'Top 5 products with stock issues', type: [ProductResponseDto] })
    latestAlerts: ProductResponseDto[];
}
