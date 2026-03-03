import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { MovementsModule } from './movements/movements.module';

@Module({
    imports: [ProductsModule, CategoriesModule, MovementsModule],
})
export class InventoryModule { }

