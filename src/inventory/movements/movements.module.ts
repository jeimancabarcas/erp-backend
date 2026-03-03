import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementOrmEntity } from './infrastructure/entities/movement.orm-entity';
import { TypeOrmMovementRepository } from './infrastructure/repositories/typeorm-movement.repository';
import { MovementRepository } from './domain/movement.repository';
import { CreateMovementUseCase } from './application/use-cases/create-movement.use-case';
import { GetMovementsUseCase } from './application/use-cases/get-movements.use-case';
import { MovementsController } from './presentation/movements.controller';
import { ProductsModule } from '../products/products.module'; // Import ProductsModule to use ProductRepository

@Module({
    imports: [
        TypeOrmModule.forFeature([MovementOrmEntity]),
        forwardRef(() => ProductsModule), // Use forwardRef to avoid circular dependency
    ],
    controllers: [MovementsController],
    providers: [
        {
            provide: MovementRepository,
            useClass: TypeOrmMovementRepository,
        },
        CreateMovementUseCase,
        GetMovementsUseCase,
    ],
    exports: [MovementRepository],
})
export class MovementsModule { }
