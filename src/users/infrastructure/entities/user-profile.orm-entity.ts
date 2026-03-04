import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity('user_profiles')
export class UserProfileOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'full_name' })
    fullName: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ name: 'display_name', nullable: true })
    displayName: string;

    @Column({ name: 'avatar_url', nullable: true })
    avatarUrl: string;

    @Column({ name: 'user_id' })
    userId: string;

    @OneToOne(() => UserOrmEntity, (user) => user.profile)
    @JoinColumn({ name: 'user_id' })
    user: UserOrmEntity;
}
