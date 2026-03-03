import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.entity';
import { UserProfile } from '../../domain/user-profile.entity';
import { UserRepository } from '../../domain/user.repository';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { UserProfileOrmEntity } from '../entities/user-profile.orm-entity';

@Injectable()
export class TypeOrmUserRepository extends UserRepository {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly userRepo: Repository<UserOrmEntity>,
        @InjectRepository(UserProfileOrmEntity)
        private readonly profileRepo: Repository<UserProfileOrmEntity>,
    ) {
        super();
    }

    async findByEmail(email: string): Promise<User | null> {
        const row = await this.userRepo.findOne({ where: { email }, relations: ['profile'] });
        return row ? this.toDomain(row) : null;
    }

    async findById(id: string): Promise<User | null> {
        const row = await this.userRepo.findOne({ where: { id }, relations: ['profile'] });
        return row ? this.toDomain(row) : null;
    }

    async save(user: User): Promise<User> {
        const orm = this.toOrm(user);
        const saved = await this.userRepo.save(orm);
        return this.toDomain(saved);
    }

    private toDomain(row: UserOrmEntity): User {
        const profile = row.profile ? new UserProfile(
            row.profile.id,
            row.profile.fullName,
            row.profile.address,
            row.profile.phone,
            row.profile.displayName,
            row.profile.userId
        ) : null;

        return new User(
            row.id,
            row.email,
            row.password,
            profile
        );
    }

    private toOrm(user: User): UserOrmEntity {
        const orm = new UserOrmEntity();
        orm.id = user.id;
        orm.email = user.email;
        orm.password = user.password;

        if (user.profile) {
            const pOrm = new UserProfileOrmEntity();
            pOrm.id = user.profile.id;
            pOrm.fullName = user.profile.fullName;
            pOrm.address = user.profile.address;
            pOrm.phone = user.profile.phone;
            pOrm.displayName = user.profile.displayName;
            pOrm.userId = user.id;
            orm.profile = pOrm;
        }

        return orm;
    }
}
