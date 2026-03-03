import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from './product-response.dto';

export class ProductsListResponseDto {
    @ApiProperty({ type: [ProductResponseDto] })
    products: ProductResponseDto[];

    @ApiProperty({ description: 'Total number of items for pagination' })
    total: number;
}
