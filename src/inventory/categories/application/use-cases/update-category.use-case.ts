import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/category.repository';
import { CategoryResponseDto } from '../dtos/category-response.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../../domain/category.entity';

@Injectable()
export class UpdateCategoryUseCase {
    constructor(private readonly repo: CategoryRepository) { }

    async execute(id: string, dto: UpdateCategoryDto): Promise<CategoryResponseDto> {
        const existing = await this.repo.findById(id);
        if (!existing) {
            throw new NotFoundException(`Categoría con id "${id}" no encontrada`);
        }

        if (dto.name && dto.name !== existing.name) {
            const conflict = await this.repo.findByName(dto.name);
            if (conflict) {
                throw new ConflictException({
                    message: `La categoría '${dto.name}' ya existe`,
                    errorCode: 'CATEGORY_NAME_DUPLICATE',
                    field: 'name',
                });
            }
        }

        const updated = new Category(
            existing.id,
            dto.name ?? existing.name,
            dto.description !== undefined ? (dto.description ?? null) : existing.description,
            existing.createdAt,
            new Date(),
        );
        const saved = await this.repo.save(updated);
        return CategoryResponseDto.fromDomain(saved);
    }
}
