import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../users/domain/user.repository';

@Injectable()
export class UploadAvatarUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: string, filename: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const avatarUrl = `/uploads/${filename}`;
        await this.userRepository.updateProfile(userId, { avatarUrl });
    }
}
