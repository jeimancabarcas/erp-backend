import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './domain/product.repository';
import { TypeOrmProductRepository } from './infrastructure/repositories/product.repository';
import { ProductOrmEntity } from './infrastructure/entities/product.orm-entity';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { GetProductsUseCase } from './application/use-cases/get-products.use-case';
import { ProductsController } from './presentation/products.controller';

@Module({
    imports: [
        // Register the ORM entity so TypeORM knows about this table
        TypeOrmModule.forFeature([ProductOrmEntity]),
    ],
    controllers: [ProductsController],
    providers: [
        // Swap: replace InMemoryProductRepository with TypeOrmProductRepository
        {
            provide: ProductRepository,
            useClass: TypeOrmProductRepository,
        },
        CreateProductUseCase,
        GetProductsUseCase,
    ],
    exports: [GetProductsUseCase],
})
export class ProductsModule { }
