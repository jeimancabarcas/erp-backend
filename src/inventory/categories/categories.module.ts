import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryOrmEntity } from './infrastructure/entities/category.orm-entity';
import { CategoryRepository } from './domain/category.repository';
import { TypeOrmCategoryRepository } from './infrastructure/repositories/category.repository';
import { GetCategoriesUseCase } from './application/use-cases/get-categories.use-case';
import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';
import { UpdateCategoryUseCase } from './application/use-cases/update-category.use-case';
import { DeleteCategoryUseCase } from './application/use-cases/delete-category.use-case';
import { CategoriesController } from './presentation/categories.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryOrmEntity]),
    ],
    controllers: [CategoriesController],
    providers: [
        {
            provide: CategoryRepository,
            useClass: TypeOrmCategoryRepository,
        },
        GetCategoriesUseCase,
        CreateCategoryUseCase,
        UpdateCategoryUseCase,
        DeleteCategoryUseCase,
    ],
    exports: [GetCategoriesUseCase],
})
export class CategoriesModule { }
