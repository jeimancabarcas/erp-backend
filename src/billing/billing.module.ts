import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingProductsController } from './presentation/billing-products.controller';
import { BillingProduct } from './domain/entities/billing-product.entity';
import { BILLING_PRODUCT_REPOSITORY } from './domain/repositories/billing-product.repository';
import { TypeOrmBillingProductRepository } from './infrastructure/repositories/typeorm-billing-product.repository';
import { CreateBillingProductUseCase } from './application/use-cases/create-billing-product.use-case';
import { GetBillingProductsUseCase } from './application/use-cases/get-billing-products.use-case';
import { UpdateBillingProductUseCase } from './application/use-cases/update-billing-product.use-case';
import { DeleteBillingProductUseCase } from './application/use-cases/delete-billing-product.use-case';

import { BillingServicesController } from './presentation/billing-services.controller';
import { BillingService } from './domain/entities/billing-service.entity';
import { BILLING_SERVICE_REPOSITORY } from './domain/repositories/billing-service.repository';
import { TypeOrmBillingServiceRepository } from './infrastructure/repositories/typeorm-billing-service.repository';
import { CreateBillingServiceUseCase } from './application/use-cases/create-billing-service.use-case';
import { GetBillingServicesUseCase } from './application/use-cases/get-billing-services.use-case';
import { UpdateBillingServiceUseCase } from './application/use-cases/update-billing-service.use-case';
import { DeleteBillingServiceUseCase } from './application/use-cases/delete-billing-service.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([BillingProduct, BillingService])],
    controllers: [BillingProductsController, BillingServicesController],
    providers: [
        {
            provide: BILLING_PRODUCT_REPOSITORY,
            useClass: TypeOrmBillingProductRepository,
        },
        CreateBillingProductUseCase,
        GetBillingProductsUseCase,
        UpdateBillingProductUseCase,
        DeleteBillingProductUseCase,
        {
            provide: BILLING_SERVICE_REPOSITORY,
            useClass: TypeOrmBillingServiceRepository,
        },
        CreateBillingServiceUseCase,
        GetBillingServicesUseCase,
        UpdateBillingServiceUseCase,
        DeleteBillingServiceUseCase,
    ],
    exports: [],
})
export class BillingModule { }
