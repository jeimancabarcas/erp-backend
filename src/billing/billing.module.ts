import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingProductsController } from './presentation/billing-products.controller';
import { BillingProduct } from './domain/entities/billing-product.entity';
import { BILLING_PRODUCT_REPOSITORY } from './domain/repositories/billing-product.repository';
import { BillingProductTax } from './domain/entities/billing-product-tax.entity';
import { BillingServiceTax } from './domain/entities/billing-service-tax.entity';
import { TypeOrmBillingProductRepository } from './infrastructure/repositories/typeorm-billing-product.repository';
import { CreateBillingProductUseCase } from './application/use-cases/create-billing-product.use-case';
import { GetBillingProductsUseCase } from './application/use-cases/get-billing-products.use-case';
import { UpdateBillingProductUseCase } from './application/use-cases/update-billing-product.use-case';
import { DeleteBillingProductUseCase } from './application/use-cases/delete-billing-product.use-case';

import { BillingServicesController } from './presentation/billing-services.controller';
import { BillingService } from './domain/entities/billing-service.entity';
import { BILLING_SERVICE_REPOSITORY } from './domain/repositories/billing-service.repository';
import { TypeOrmBillingServiceRepository } from './infrastructure/repositories/typeorm-billing-service.repository';
import { CreateBillingServiceUseCase } from './application/use-cases/create-billing-service.use-case';
import { GetBillingServicesUseCase } from './application/use-cases/get-billing-services.use-case';
import { UpdateBillingServiceUseCase } from './application/use-cases/update-billing-service.use-case';
import { DeleteBillingServiceUseCase } from './application/use-cases/delete-billing-service.use-case';

import { BillingTax } from './domain/entities/billing-tax.entity';
import { BILLING_TAX_REPOSITORY } from './domain/repositories/billing-tax.repository';
import { TypeOrmBillingTaxRepository } from './infrastructure/repositories/typeorm-billing-tax.repository';
import { CreateBillingTaxUseCase } from './application/use-cases/create-billing-tax.use-case';
import { GetBillingTaxesUseCase } from './application/use-cases/get-billing-taxes.use-case';
import { UpdateBillingTaxUseCase } from './application/use-cases/update-billing-tax.use-case';
import { DeleteBillingTaxUseCase } from './application/use-cases/delete-billing-tax.use-case';
import { BillingTaxesController } from './presentation/billing-taxes.controller';

import { BillingPaymentMethod } from './domain/entities/billing-payment-method.entity';
import { BILLING_PAYMENT_METHOD_REPOSITORY } from './domain/repositories/billing-payment-method.repository';
import { TypeOrmBillingPaymentMethodRepository } from './infrastructure/repositories/typeorm-billing-payment-method.repository';
import { CreateBillingPaymentMethodUseCase } from './application/use-cases/create-billing-payment-method.use-case';
import { GetBillingPaymentMethodsUseCase } from './application/use-cases/get-billing-payment-methods.use-case';
import { UpdateBillingPaymentMethodUseCase } from './application/use-cases/update-billing-payment-method.use-case';
import { DeleteBillingPaymentMethodUseCase } from './application/use-cases/delete-billing-payment-method.use-case';
import { BillingPaymentMethodsController } from './presentation/billing-payment-methods.controller';

import { BillingPaymentFrequency } from './domain/entities/billing-payment-frequency.entity';
import { BILLING_PAYMENT_FREQUENCY_REPOSITORY } from './domain/repositories/billing-payment-frequency.repository';
import { TypeOrmBillingPaymentFrequencyRepository } from './infrastructure/repositories/typeorm-billing-payment-frequency.repository';
import { GetBillingPaymentFrequenciesUseCase } from './application/use-cases/get-billing-payment-frequencies.use-case';
import { CreateBillingPaymentFrequencyUseCase } from './application/use-cases/create-billing-payment-frequency.use-case';
import { UpdateBillingPaymentFrequencyUseCase } from './application/use-cases/update-billing-payment-frequency.use-case';
import { DeleteBillingPaymentFrequencyUseCase } from './application/use-cases/delete-billing-payment-frequency.use-case';
import { BillingPaymentFrequenciesController } from './presentation/billing-payment-frequencies.controller';

import { BillingPaymentTerm } from './domain/entities/billing-payment-term.entity';
import { BILLING_PAYMENT_TERM_REPOSITORY } from './domain/repositories/billing-payment-term.repository';
import { TypeOrmBillingPaymentTermRepository } from './infrastructure/repositories/typeorm-billing-payment-term.repository';
import { GetBillingPaymentTermsUseCase } from './application/use-cases/get-billing-payment-terms.use-case';
import { CreateBillingPaymentTermUseCase } from './application/use-cases/create-billing-payment-term.use-case';
import { UpdateBillingPaymentTermUseCase } from './application/use-cases/update-billing-payment-term.use-case';
import { DeleteBillingPaymentTermUseCase } from './application/use-cases/delete-billing-payment-term.use-case';
import { BillingPaymentTermsController } from './presentation/billing-payment-terms.controller';

import { BillingClient } from './domain/entities/billing-client.entity';
import { BILLING_CLIENT_REPOSITORY } from './domain/repositories/billing-client.repository';
import { TypeOrmBillingClientRepository } from './infrastructure/repositories/typeorm-billing-client.repository';
import { CreateBillingClientUseCase } from './application/use-cases/create-billing-client.use-case';
import { GetBillingClientsUseCase } from './application/use-cases/get-billing-clients.use-case';
import { UpdateBillingClientUseCase } from './application/use-cases/update-billing-client.use-case';
import { DeleteBillingClientUseCase } from './application/use-cases/delete-billing-client.use-case';
import { BillingClientsController } from './presentation/billing-clients.controller';

import { BillingTemplatePreference } from './domain/entities/billing-template-preference.entity';
import { BILLING_TEMPLATE_PREFERENCE_REPOSITORY } from './domain/repositories/billing-template-preference.repository';
import { TypeOrmBillingTemplatePreferenceRepository } from './infrastructure/repositories/typeorm-billing-template-preference.repository';
import { GetTemplatePreferenceUseCase } from './application/use-cases/get-template-preference.use-case';
import { UpsertTemplatePreferenceUseCase } from './application/use-cases/upsert-template-preference.use-case';
import { UploadLogoUseCase } from './application/use-cases/upload-logo.use-case';
import { BillingTemplatePreferencesController } from './presentation/billing-template-preferences.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        BillingProduct,
        BillingService,
        BillingTax,
        BillingPaymentMethod,
        BillingClient,
        BillingTemplatePreference,
        BillingProductTax,
        BillingServiceTax,
        BillingPaymentFrequency,
        BillingPaymentTerm,
    ])],
    controllers: [
        BillingProductsController,
        BillingServicesController,
        BillingTaxesController,
        BillingPaymentMethodsController,
        BillingClientsController,
        BillingTemplatePreferencesController,
        BillingPaymentFrequenciesController,
        BillingPaymentTermsController,
    ],
    providers: [
        {
            provide: BILLING_PRODUCT_REPOSITORY,
            useClass: TypeOrmBillingProductRepository,
        },
        CreateBillingProductUseCase,
        GetBillingProductsUseCase,
        UpdateBillingProductUseCase,
        DeleteBillingProductUseCase,
        {
            provide: BILLING_SERVICE_REPOSITORY,
            useClass: TypeOrmBillingServiceRepository,
        },
        CreateBillingServiceUseCase,
        GetBillingServicesUseCase,
        UpdateBillingServiceUseCase,
        DeleteBillingServiceUseCase,
        {
            provide: BILLING_TAX_REPOSITORY,
            useClass: TypeOrmBillingTaxRepository,
        },
        CreateBillingTaxUseCase,
        GetBillingTaxesUseCase,
        UpdateBillingTaxUseCase,
        DeleteBillingTaxUseCase,
        {
            provide: BILLING_PAYMENT_METHOD_REPOSITORY,
            useClass: TypeOrmBillingPaymentMethodRepository,
        },
        CreateBillingPaymentMethodUseCase,
        GetBillingPaymentMethodsUseCase,
        UpdateBillingPaymentMethodUseCase,
        DeleteBillingPaymentMethodUseCase,
        {
            provide: BILLING_CLIENT_REPOSITORY,
            useClass: TypeOrmBillingClientRepository,
        },
        CreateBillingClientUseCase,
        GetBillingClientsUseCase,
        UpdateBillingClientUseCase,
        DeleteBillingClientUseCase,
        {
            provide: BILLING_TEMPLATE_PREFERENCE_REPOSITORY,
            useClass: TypeOrmBillingTemplatePreferenceRepository,
        },
        GetTemplatePreferenceUseCase,
        UpsertTemplatePreferenceUseCase,
        UploadLogoUseCase,
        {
            provide: BILLING_PAYMENT_FREQUENCY_REPOSITORY,
            useClass: TypeOrmBillingPaymentFrequencyRepository,
        },
        GetBillingPaymentFrequenciesUseCase,
        CreateBillingPaymentFrequencyUseCase,
        UpdateBillingPaymentFrequencyUseCase,
        DeleteBillingPaymentFrequencyUseCase,
        {
            provide: BILLING_PAYMENT_TERM_REPOSITORY,
            useClass: TypeOrmBillingPaymentTermRepository,
        },
        GetBillingPaymentTermsUseCase,
        CreateBillingPaymentTermUseCase,
        UpdateBillingPaymentTermUseCase,
        DeleteBillingPaymentTermUseCase,
    ],
    exports: [],
})
export class BillingModule { }
