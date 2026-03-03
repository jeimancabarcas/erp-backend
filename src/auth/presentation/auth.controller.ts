import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { LoginDto } from '../application/dtos/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
    ) { }

    @Post('login')
    @ApiOperation({ summary: 'Login and get JWT token' })
    async login(@Body() dto: LoginDto) {
        return this.loginUseCase.execute(dto);
    }
}
