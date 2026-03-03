import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../domain/category.repository';
import { CategoryResponseDto } from '../dtos/category-response.dto';

@Injectable()
export class GetCategoriesUseCase {
    constructor(private readonly repo: CategoryRepository) { }

    async execute(): Promise<CategoryResponseDto[]> {
        const cats = await this.repo.findAll();
        return cats.map(CategoryResponseDto.fromDomain);
    }
}
