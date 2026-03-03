import { Movement } from './movement.entity';

export abstract class MovementRepository {
    abstract create(movement: Movement): Promise<Movement>;
    abstract findAll(): Promise<Movement[]>;
    abstract findByProductId(productId: string): Promise<Movement[]>;
}
