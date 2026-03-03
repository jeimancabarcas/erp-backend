import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/entities/user.orm-entity';
import { UserProfileOrmEntity } from './infrastructure/entities/user-profile.orm-entity';
import { UserRepository } from './domain/user.repository';
import { TypeOrmUserRepository } from './infrastructure/repositories/typeorm-user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserOrmEntity, UserProfileOrmEntity]),
    ],
    providers: [
        {
            provide: UserRepository,
            useClass: TypeOrmUserRepository,
        },
    ],
    exports: [UserRepository],
})
export class UsersModule { }
