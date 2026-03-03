export class UserProfile {
    constructor(
        public readonly id: string,
        public readonly fullName: string,
        public readonly address: string,
        public readonly phone: string,
        public readonly displayName: string,
        public readonly userId: string,
    ) { }
}
