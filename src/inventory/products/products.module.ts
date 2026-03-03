import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './domain/product.repository';
import { TypeOrmProductRepository } from './infrastructure/repositories/product.repository';
import { ProductOrmEntity } from './infrastructure/entities/product.orm-entity';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { GetProductsUseCase } from './application/use-cases/get-products.use-case';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case';
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case';
import { ProductsController } from './presentation/products.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductOrmEntity]),
    ],
    controllers: [ProductsController],
    providers: [
        {
            provide: ProductRepository,
            useClass: TypeOrmProductRepository,
        },
        CreateProductUseCase,
        GetProductsUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase,
    ],
    exports: [GetProductsUseCase],
})
export class ProductsModule { }
