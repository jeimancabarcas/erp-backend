import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/category.repository';

@Injectable()
export class DeleteCategoryUseCase {
    constructor(private readonly repo: CategoryRepository) { }

    async execute(id: string): Promise<void> {
        const existing = await this.repo.findById(id);
        if (!existing) {
            throw new NotFoundException(`Categoría con id "${id}" no encontrada`);
        }
        await this.repo.delete(id);
    }
}
