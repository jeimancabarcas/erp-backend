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
    Query,
    UsePipes,
    ValidationPipe,
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
import { StockAlertResponseDto } from '../application/dtos/stock-alert-response.dto';
import { GetProductsQueryDto } from '../application/dtos/get-products-query.dto';
import { GetStockAlertsUseCase } from '../application/use-cases/get-stock-alerts.use-case';
import { GetDashboardStatsUseCase } from '../application/use-cases/get-dashboard-stats.use-case';
import { DashboardStatsResponseDto } from '../application/dtos/dashboard-stats-response.dto';

@ApiTags('inventory-products')
@Controller('inventory/products')
export class ProductsController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly getProductsUseCase: GetProductsUseCase,
        private readonly getStockAlertsUseCase: GetStockAlertsUseCase,
        private readonly getDashboardStatsUseCase: GetDashboardStatsUseCase,
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
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    @ApiOperation({ summary: 'Listar productos de inventario con filtro y orden opcionales' })
    @ApiOkResponse({ description: 'Lista de productos', type: [ProductResponseDto] })
    findAll(@Query() query: GetProductsQueryDto): Promise<ProductResponseDto[]> {
        return this.getProductsUseCase.execute(query);
    }

    @Get('alerts')
    @ApiOperation({ summary: 'Obtener alertas de stock (bajo o agotado)' })
    @ApiOkResponse({ description: 'Alertas de stock', type: StockAlertResponseDto })
    getAlerts(): Promise<StockAlertResponseDto> {
        return this.getStockAlertsUseCase.execute();
    }

    @Get('stats')
    @ApiOperation({ summary: 'Obtener estadísticas generales del dashboard' })
    @ApiOkResponse({ description: 'Estadísticas del dashboard', type: DashboardStatsResponseDto })
    getStats(): Promise<DashboardStatsResponseDto> {
        return this.getDashboardStatsUseCase.execute();
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
