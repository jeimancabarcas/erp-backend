import { Controller, Post, Body, Patch, UseGuards, Req, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { LoginDto } from '../application/dtos/login.dto';
import { UpdateProfileUseCase } from '../application/use-cases/update-profile.use-case';
import { UpdateProfileDto } from '../application/dtos/update-profile.dto';
import { ChangePasswordUseCase } from '../application/use-cases/change-password.use-case';
import { ChangePasswordDto } from '../application/dtos/change-password.dto';
import { UploadAvatarUseCase } from '../application/use-cases/upload-avatar.use-case';
import { JwtAuthGuard } from '../infrastructure/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly updateProfileUseCase: UpdateProfileUseCase,
        private readonly changePasswordUseCase: ChangePasswordUseCase,
        private readonly uploadAvatarUseCase: UploadAvatarUseCase,
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

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('upload-avatar')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: { file: { type: 'string', format: 'binary' } },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Upload user avatar' })
    async uploadAvatar(
        @Req() req: any,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: /image\/(jpe?g|png|gif)$/i,
                    skipMagicNumbersValidation: true,
                })
                .addMaxSizeValidator({
                    maxSize: 800 * 1024,
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        ) file: any
    ) {
        await this.uploadAvatarUseCase.execute(req.user.userId, file.filename);
        return { filename: file.filename, url: `/uploads/${file.filename}` };
    }
}
