import { Category } from './category.entity';

export abstract class CategoryRepository {
    abstract findAll(): Promise<Category[]>;
    abstract findById(id: string): Promise<Category | null>;
    abstract findByName(name: string): Promise<Category | null>;
    abstract save(category: Category): Promise<Category>;
    abstract delete(id: string): Promise<void>;
}
