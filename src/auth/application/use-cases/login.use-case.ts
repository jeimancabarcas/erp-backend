import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../../users/domain/user.repository';
import { LoginDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async execute(dto: LoginDto): Promise<{ accessToken: string; user: any }> {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            displayName: user.profile?.displayName || user.email
        };

        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                profile: user.profile
            }
        };
    }
}
