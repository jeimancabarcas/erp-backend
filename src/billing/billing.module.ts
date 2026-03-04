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

@Module({
    imports: [TypeOrmModule.forFeature([BillingProduct])],
    controllers: [BillingProductsController],
    providers: [
        {
            provide: BILLING_PRODUCT_REPOSITORY,
            useClass: TypeOrmBillingProductRepository,
        },
        CreateBillingProductUseCase,
        GetBillingProductsUseCase,
        UpdateBillingProductUseCase,
        DeleteBillingProductUseCase,
    ],
    exports: [],
})
export class BillingModule { }
