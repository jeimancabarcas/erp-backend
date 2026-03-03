import { Controller, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { LoginDto } from '../application/dtos/login.dto';
import { UpdateProfileUseCase } from '../application/use-cases/update-profile.use-case';
import { UpdateProfileDto } from '../application/dtos/update-profile.dto';
import { ChangePasswordUseCase } from '../application/use-cases/change-password.use-case';
import { ChangePasswordDto } from '../application/dtos/change-password.dto';
import { JwtAuthGuard } from '../infrastructure/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly updateProfileUseCase: UpdateProfileUseCase,
        private readonly changePasswordUseCase: ChangePasswordUseCase,
    ) { }

    @Post('login')
    @ApiOperation({ summary: 'Login and get JWT token' })
    async login(@Body() dto: LoginDto) {
        return this.loginUseCase.execute(dto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch('profile')
    @ApiOperation({ summary: 'Update user profile' })
    async updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
        return this.updateProfileUseCase.execute(req.user.userId, dto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('change-password')
    @ApiOperation({ summary: 'Change user password' })
    async changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
        return this.changePasswordUseCase.execute(req.user.userId, dto);
    }
}
