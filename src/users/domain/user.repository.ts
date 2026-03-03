import { User } from './user.entity';
import { UserProfile } from './user-profile.entity';

export abstract class UserRepository {
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findById(id: string): Promise<User | null>;
    abstract save(user: User): Promise<User>;
    abstract updateProfile(id: string, profile: Partial<UserProfile>): Promise<void>;
    abstract updateCredentials(id: string, passwordHash: string): Promise<void>;
}
