import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { GetCategoriesUseCase } from '../application/use-cases/get-categories.use-case';
import { CreateCategoryUseCase } from '../application/use-cases/create-category.use-case';
import { UpdateCategoryUseCase } from '../application/use-cases/update-category.use-case';
import { DeleteCategoryUseCase } from '../application/use-cases/delete-category.use-case';
import { CreateCategoryDto } from '../application/dtos/create-category.dto';
import { UpdateCategoryDto } from '../application/dtos/update-category.dto';
import { CategoryResponseDto } from '../application/dtos/category-response.dto';

@ApiTags('inventory-categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inventory/categories')
export class CategoriesController {
    constructor(
        private readonly getCategories: GetCategoriesUseCase,
        private readonly createCategory: CreateCategoryUseCase,
        private readonly updateCategory: UpdateCategoryUseCase,
        private readonly deleteCategory: DeleteCategoryUseCase,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Listar categorías' })
    @ApiOkResponse({ type: [CategoryResponseDto] })
    findAll(): Promise<CategoryResponseDto[]> {
        return this.getCategories.execute();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear categoría' })
    @ApiCreatedResponse({ type: CategoryResponseDto })
    create(@Body() dto: CreateCategoryDto): Promise<CategoryResponseDto> {
        return this.createCategory.execute(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar categoría' })
    @ApiOkResponse({ type: CategoryResponseDto })
    @ApiNotFoundResponse()
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateCategoryDto,
    ): Promise<CategoryResponseDto> {
        return this.updateCategory.execute(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar categoría' })
    @ApiNoContentResponse()
    @ApiNotFoundResponse()
    remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.deleteCategory.execute(id);
    }
}
