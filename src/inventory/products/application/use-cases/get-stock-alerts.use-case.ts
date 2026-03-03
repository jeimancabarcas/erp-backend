import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';
import { StockAlertResponseDto } from '../dtos/stock-alert-response.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';

@Injectable()
export class GetStockAlertsUseCase {
    constructor(private readonly productRepository: ProductRepository) { }

    async execute(): Promise<StockAlertResponseDto> {
        // Fetch all products (or use a specialized query if performance is an issue)
        const allProducts = await this.productRepository.findAll();

        const outOfStock = allProducts.filter(p => p.stock === 0);
        const lowStock = allProducts.filter(p => p.stock > 0 && p.minStock !== null && p.stock < p.minStock);

        // Combine and take top 5, prioritizing out of stock
        const alerts = [...outOfStock, ...lowStock]
            .slice(0, 5)
            .map(ProductResponseDto.fromDomain);

        return {
            outOfStockCount: outOfStock.length,
            lowStockCount: lowStock.length,
            latestAlerts: alerts
        };
    }
}
