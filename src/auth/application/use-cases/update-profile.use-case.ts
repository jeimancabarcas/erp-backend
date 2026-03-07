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

        const updateData: any = {
            fullName: dto.fullName,
            address: dto.address,
            phone: dto.phone,
            displayName: dto.displayName,
            position: dto.position,
            identificationNumber: dto.identificationNumber,
            identificationType: dto.identificationType,
        };

        if (dto.avatarUrl !== undefined) {
            updateData.avatarUrl = dto.avatarUrl;
        }

        await this.userRepository.updateProfile(userId, updateData);
    }
}
