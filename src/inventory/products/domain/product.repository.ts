import { Product } from './product.entity';
import { GetProductsQueryDto } from '../application/dtos/get-products-query.dto';

export abstract class ProductRepository {
    abstract findAll(query?: GetProductsQueryDto): Promise<{ data: Product[]; total: number }>;
    abstract findById(id: string): Promise<Product | null>;
    abstract findBySku(sku: string): Promise<Product | null>;
    abstract save(product: Product): Promise<Product>;
    abstract delete(id: string): Promise<void>;
}
