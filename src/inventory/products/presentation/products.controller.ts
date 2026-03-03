import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateProductUseCase } from '../application/use-cases/create-product.use-case';
import { GetProductsUseCase } from '../application/use-cases/get-products.use-case';
import { CreateProductDto } from '../application/dtos/create-product.dto';
import { ProductResponseDto } from '../application/dtos/product-response.dto';

@ApiTags('inventory-products')
@Controller('inventory/products')
export class ProductsController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly getProductsUseCase: GetProductsUseCase,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear un nuevo producto de inventario' })
    @ApiCreatedResponse({ description: 'Producto creado exitosamente', type: ProductResponseDto })
    create(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
        return this.createProductUseCase.execute(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los productos de inventario' })
    @ApiOkResponse({ description: 'Lista de productos', type: [ProductResponseDto] })
    findAll(): Promise<ProductResponseDto[]> {
        return this.getProductsUseCase.execute();
    }
}
