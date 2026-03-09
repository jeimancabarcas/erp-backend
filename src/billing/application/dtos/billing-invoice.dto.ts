import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, IsArray, ValidateNested, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

class CreateBillingInvoiceItemTaxDto {
    @ApiProperty()
    @IsString()
    taxName: string;

    @ApiProperty()
    @IsNumber()
    taxRate: number;

    @ApiProperty()
    @IsNumber()
    taxAmount: number;
}

class CreateBillingInvoiceItemDto {
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsUUID()
    itemId?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    itemType?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    standardCode?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    internalCode?: string;

    @ApiProperty()
    @IsNumber()
    subTotal: number;

    @ApiProperty({ type: [CreateBillingInvoiceItemTaxDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateBillingInvoiceItemTaxDto)
    taxes: CreateBillingInvoiceItemTaxDto[];
}

export class CreateBillingInvoiceDto {
    @ApiProperty()
    @IsString()
    invoiceNumber: string;

    @ApiProperty()
    @IsDateString()
    invoiceDate: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsUUID()
    clientId?: string;

    // Company Snapshot
    @ApiProperty()
    @IsString()
    companyName: string;

    @ApiProperty()
    @IsString()
    companyNit: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    companyAddress?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    companyPhone?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    companyEmail?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    companyWebsite?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    companyLogoUrl?: string;

    // Client Snapshot
    @ApiProperty()
    @IsString()
    clientName: string;

    @ApiProperty()
    @IsString()
    clientDocumentType: string;

    @ApiProperty()
    @IsString()
    clientDocumentNumber: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    clientAddress?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    clientPhone?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    clientEmail?: string;

    // Payment Snapshot
    @ApiProperty()
    @IsString()
    paymentType: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    paymentMethodName?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    paymentMethodDetails?: string;

    // Credit Snapshot
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    creditInstallments?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    creditFrequencyName?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    creditTermName?: string;

    // Totals
    @ApiProperty()
    @IsNumber()
    subTotal: number;

    @ApiProperty()
    @IsNumber()
    taxAmount: number;

    @ApiProperty()
    @IsNumber()
    discountAmount: number;

    @ApiProperty()
    @IsNumber()
    grandTotal: number;

    // Appearance
    @ApiProperty()
    @IsString()
    @IsOptional()
    notes?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    signatureName?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    signaturePosition?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    signatureIdType?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    signatureIdNumber?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    signatureFont?: string;

    @ApiProperty({ type: [CreateBillingInvoiceItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateBillingInvoiceItemDto)
    items: CreateBillingInvoiceItemDto[];
}
