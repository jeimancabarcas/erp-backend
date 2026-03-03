import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../users/domain/user.repository';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChangePasswordUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: string, dto: ChangePasswordDto): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordMatching = await bcrypt.compare(dto.currentPassword, user.password);
        if (!isPasswordMatching) {
            throw new UnauthorizedException('Contraseña actual incorrecta');
        }

        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        await this.userRepository.updateCredentials(userId, hashedPassword);
    }
}
