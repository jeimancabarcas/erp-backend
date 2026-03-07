import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';

@Entity('user_profiles')
export class UserProfileOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'full_name' })
    fullName: string;

    @Column({ type: 'text', nullable: true })
    address: string | null;

    @Column({ type: 'varchar', nullable: true })
    phone: string | null;

    @Column({ name: 'display_name', type: 'varchar', nullable: true })
    displayName: string | null;

    @Column({ name: 'avatar_url', type: 'varchar', nullable: true })
    avatarUrl: string | null;

    @Column({ type: 'varchar', nullable: true })
    position: string | null;

    @Column({ name: 'identification_number', type: 'varchar', nullable: true })
    identificationNumber: string | null;

    @Column({ name: 'identification_type', type: 'varchar', nullable: true })
    identificationType: string | null;

    @Column({ name: 'user_id' })
    userId: string;

    @OneToOne(() => UserOrmEntity, (user) => user.profile)
    @JoinColumn({ name: 'user_id' })
    user: UserOrmEntity;
}
