import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './domain/product.repository';
import { TypeOrmProductRepository } from './infrastructure/repositories/product.repository';
import { ProductOrmEntity } from './infrastructure/entities/product.orm-entity';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { GetProductsUseCase } from './application/use-cases/get-products.use-case';
import { GetStockAlertsUseCase } from './application/use-cases/get-stock-alerts.use-case';
import { GetDashboardStatsUseCase } from './application/use-cases/get-dashboard-stats.use-case';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case';
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case';
import { ProductsController } from './presentation/products.controller';
import { MovementsModule } from '../movements/movements.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductOrmEntity]),
        forwardRef(() => MovementsModule),
    ],
    controllers: [ProductsController],
    providers: [
        {
            provide: ProductRepository,
            useClass: TypeOrmProductRepository,
        },
        CreateProductUseCase,
        GetProductsUseCase,
        GetStockAlertsUseCase,
        GetDashboardStatsUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase,
    ],
    exports: [GetProductsUseCase, ProductRepository],
})
export class ProductsModule { }
