import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../domain/category.entity';
import { CategoryRepository } from '../../domain/category.repository';
import { CategoryOrmEntity } from '../entities/category.orm-entity';

@Injectable()
export class TypeOrmCategoryRepository extends CategoryRepository {
    constructor(
        @InjectRepository(CategoryOrmEntity)
        private readonly ormRepo: Repository<CategoryOrmEntity>,
    ) {
        super();
    }

    async findAll(): Promise<Category[]> {
        const rows = await this.ormRepo.find({ order: { name: 'ASC' } });
        return rows.map(this.toDomain);
    }

    async findById(id: string): Promise<Category | null> {
        const row = await this.ormRepo.findOne({ where: { id } });
        return row ? this.toDomain(row) : null;
    }

    async findByName(name: string): Promise<Category | null> {
        const row = await this.ormRepo.findOne({ where: { name } });
        return row ? this.toDomain(row) : null;
    }

    async save(category: Category): Promise<Category> {
        const orm: Partial<CategoryOrmEntity> = {
            id: category.id,
            name: category.name,
            description: category.description,
        };
        const saved = await this.ormRepo.save(orm);
        return this.toDomain(saved);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }

    private toDomain(row: CategoryOrmEntity): Category {
        return new Category(
            row.id,
            row.name,
            row.description,
            row.createdAt,
            row.updatedAt,
        );
    }
}
