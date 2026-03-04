import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthController } from './presentation/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UpdateProfileUseCase } from './application/use-cases/update-profile.use-case';
import { ChangePasswordUseCase } from './application/use-cases/change-password.use-case';
import { UploadAvatarUseCase } from './application/use-cases/upload-avatar.use-case';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: 'secretKey', // In production use environment variables
            signOptions: { expiresIn: '1h' },
        }),
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                    cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [LoginUseCase, UpdateProfileUseCase, ChangePasswordUseCase, UploadAvatarUseCase, JwtStrategy],
    exports: [LoginUseCase, UpdateProfileUseCase, ChangePasswordUseCase, UploadAvatarUseCase],
})
export class AuthModule { }
