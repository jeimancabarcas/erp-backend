import { UserProfile } from './user-profile.entity';

export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly profile: UserProfile | null = null,
    ) { }
}
