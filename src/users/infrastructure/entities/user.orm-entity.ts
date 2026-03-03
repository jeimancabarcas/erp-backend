import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserProfileOrmEntity } from './user-profile.orm-entity';

@Entity('users')
export class UserOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToOne(() => UserProfileOrmEntity, (profile) => profile.user, { cascade: true })
    profile: UserProfileOrmEntity;
}
