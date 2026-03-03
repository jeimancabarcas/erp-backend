import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../users/domain/user.repository';
import { UpdateProfileDto } from '../dtos/update-profile.dto';

@Injectable()
export class UpdateProfileUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: string, dto: UpdateProfileDto): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.userRepository.updateProfile(userId, {
            fullName: dto.fullName,
            address: dto.address,
            phone: dto.phone,
            displayName: dto.displayName,
        });
    }
}
