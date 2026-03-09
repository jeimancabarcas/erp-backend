import { Injectable } from '@nestjs/common';
import { BillingInvoiceRepository } from '../../domain/repositories/billing-invoice.repository';
import { CreateBillingInvoiceDto } from '../dtos/billing-invoice.dto';
import { BillingInvoice } from '../../domain/entities/billing-invoice.entity';
import { BillingInvoiceItem } from '../../domain/entities/billing-invoice-item.entity';
import { BillingInvoiceItemTax } from '../../domain/entities/billing-invoice-item-tax.entity';

@Injectable()
export class CreateBillingInvoiceUseCase {
    constructor(private readonly repository: BillingInvoiceRepository) { }

    async execute(dto: CreateBillingInvoiceDto): Promise<BillingInvoice> {
        const invoice = new BillingInvoice();

        // Basic Info
        invoice.invoiceNumber = dto.invoiceNumber;
        invoice.invoiceDate = new Date(dto.invoiceDate);

        // Company Snapshot
        invoice.companyName = dto.companyName;
        invoice.companyNit = dto.companyNit;
        invoice.companyAddress = dto.companyAddress || '';
        invoice.companyPhone = dto.companyPhone || '';
        invoice.companyEmail = dto.companyEmail || '';
        invoice.companyWebsite = dto.companyWebsite || '';
        invoice.companyLogoUrl = dto.companyLogoUrl || '';

        // Client Snapshot
        invoice.clientName = dto.clientName;
        invoice.clientDocumentType = dto.clientDocumentType;
        invoice.clientDocumentNumber = dto.clientDocumentNumber;
        invoice.clientAddress = dto.clientAddress || '';
        invoice.clientPhone = dto.clientPhone || '';
        invoice.clientEmail = dto.clientEmail || '';

        // Payment Snapshot
        invoice.paymentType = dto.paymentType;
        invoice.paymentMethodName = dto.paymentMethodName || '';
        invoice.paymentMethodDetails = dto.paymentMethodDetails || '';

        // Credit Snapshot
        invoice.creditInstallments = dto.creditInstallments || 1;
        invoice.creditFrequencyName = dto.creditFrequencyName || '';
        invoice.creditTermName = dto.creditTermName || '';

        // Totals
        invoice.subTotal = dto.subTotal;
        invoice.taxAmount = dto.taxAmount;
        invoice.discountAmount = dto.discountAmount;
        invoice.grandTotal = dto.grandTotal;

        // Appearance
        invoice.notes = dto.notes || '';
        invoice.signatureName = dto.signatureName || '';
        invoice.signaturePosition = dto.signaturePosition || '';
        invoice.signatureIdType = dto.signatureIdType || '';
        invoice.signatureIdNumber = dto.signatureIdNumber || '';
        invoice.signatureFont = dto.signatureFont || '';

        // Items
        invoice.items = dto.items.map(itemDto => {
            const item = new BillingInvoiceItem();
            item.description = itemDto.description;
            item.price = itemDto.price;
            item.quantity = itemDto.quantity;
            item.subTotal = itemDto.subTotal;
            item.itemId = itemDto.itemId || null;
            item.itemType = itemDto.itemType || null;
            item.standardCode = itemDto.standardCode || null;
            item.internalCode = itemDto.internalCode || null;

            // Item Taxes
            item.taxes = itemDto.taxes.map(taxDto => {
                const tax = new BillingInvoiceItemTax();
                tax.taxName = taxDto.taxName;
                tax.taxRate = taxDto.taxRate;
                tax.taxAmount = taxDto.taxAmount;
                return tax;
            });

            return item;
        });

        return await this.repository.save(invoice);
    }
}
