import { Movement } from './movement.entity';

export abstract class MovementRepository {
    abstract create(movement: Movement): Promise<Movement>;
    abstract findAll(query?: any): Promise<{ data: Movement[], total: number }>;
    abstract findByProductId(productId: string): Promise<Movement[]>;
}
