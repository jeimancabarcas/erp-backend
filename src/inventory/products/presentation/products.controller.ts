import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Delete,
    Param,
    ParseUUIDPipe,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateProductUseCase } from '../application/use-cases/create-product.use-case';
import { GetProductsUseCase } from '../application/use-cases/get-products.use-case';
import { UpdateProductUseCase } from '../application/use-cases/update-product.use-case';
import { DeleteProductUseCase } from '../application/use-cases/delete-product.use-case';
import { CreateProductDto } from '../application/dtos/create-product.dto';
import { UpdateProductDto } from '../application/dtos/update-product.dto';
import { ProductResponseDto } from '../application/dtos/product-response.dto';

@ApiTags('inventory-products')
@Controller('inventory/products')
export class ProductsController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly getProductsUseCase: GetProductsUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase,
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

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un producto por ID' })
    @ApiOkResponse({ description: 'Producto actualizado', type: ProductResponseDto })
    @ApiNotFoundResponse({ description: 'Producto no encontrado' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateProductDto,
    ): Promise<ProductResponseDto> {
        return this.updateProductUseCase.execute(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar un producto por ID' })
    @ApiNoContentResponse({ description: 'Producto eliminado' })
    @ApiNotFoundResponse({ description: 'Producto no encontrado' })
    remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.deleteProductUseCase.execute(id);
    }
}
