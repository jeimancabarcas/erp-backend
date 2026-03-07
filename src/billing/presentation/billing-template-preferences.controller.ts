import { Controller, Get, Put, Body, Post, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { GetTemplatePreferenceUseCase } from '../application/use-cases/get-template-preference.use-case';
import { UpsertTemplatePreferenceUseCase, UpsertPreferenceDto } from '../application/use-cases/upsert-template-preference.use-case';
import { UploadLogoUseCase } from '../application/use-cases/upload-logo.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Billing Preferences')
@Controller('billing/preferences')
export class BillingTemplatePreferencesController {
    constructor(
        private readonly getPreferenceUseCase: GetTemplatePreferenceUseCase,
        private readonly upsertPreferenceUseCase: UpsertTemplatePreferenceUseCase,
        private readonly uploadLogoUseCase: UploadLogoUseCase,
    ) { }

    @Get()
    async getPreference() {
        return this.getPreferenceUseCase.execute();
    }

    @Put()
    @ApiOperation({ summary: 'Update billing template preferences' })
    async updatePreference(@Body() dto: UpsertPreferenceDto) {
        return this.upsertPreferenceUseCase.execute(dto);
    }

    @Post('upload-logo')
    @ApiOperation({ summary: 'Upload billing logo' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: { file: { type: 'string', format: 'binary' } },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadLogo(
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: /image\/(jpe?g|png|gif|svg\+xml)$/i,
                    skipMagicNumbersValidation: true,
                })
                .addMaxSizeValidator({
                    maxSize: 1024 * 1024, // 1MB for logos (often higher quality)
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        ) file: any
    ) {
        return this.uploadLogoUseCase.execute(file.filename);
    }
}
