import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../domain/category.repository';
import { CategoryResponseDto } from '../dtos/category-response.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Category } from '../../domain/category.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateCategoryUseCase {
    constructor(private readonly repo: CategoryRepository) { }

    async execute(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
        const existing = await this.repo.findByName(dto.name);
        if (existing) {
            throw new ConflictException({
                message: `La categoría '${dto.name}' ya existe`,
                errorCode: 'CATEGORY_NAME_DUPLICATE',
                field: 'name',
            });
        }

        const now = new Date();
        const category = new Category(
            randomUUID(),
            dto.name,
            dto.description ?? null,
            now,
            now,
        );
        const saved = await this.repo.save(category);
        return CategoryResponseDto.fromDomain(saved);
    }
}
