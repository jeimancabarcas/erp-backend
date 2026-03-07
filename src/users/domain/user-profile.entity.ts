export class UserProfile {
    constructor(
        public readonly id: string,
        public readonly fullName: string,
        public readonly address: string | null,
        public readonly phone: string | null,
        public readonly displayName: string | null,
        public readonly userId: string,
        public readonly position: string | null = null,
        public readonly identificationNumber: string | null = null,
        public readonly identificationType: string | null = null,
        public readonly avatarUrl: string | null = null,
    ) { }
}
