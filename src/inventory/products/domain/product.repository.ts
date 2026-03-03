import { Product } from './product.entity';
import { GetProductsQueryDto } from '../application/dtos/get-products-query.dto';

export abstract class ProductRepository {
    abstract findAll(query?: GetProductsQueryDto): Promise<Product[]>;
    abstract findById(id: string): Promise<Product | null>;
    abstract findBySku(sku: string): Promise<Product | null>;
    abstract save(product: Product): Promise<Product>;
    abstract delete(id: string): Promise<void>;
}
