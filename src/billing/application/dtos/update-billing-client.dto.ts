import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateBillingClientDto {
    @IsString()
    @IsOptional()
    documentType?: string;

    @IsString()
    @IsOptional()
    documentNumber?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;
}
