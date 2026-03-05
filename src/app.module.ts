import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { ProductOrmEntity } from './inventory/products/infrastructure/entities/product.orm-entity';
import { CategoryOrmEntity } from './inventory/categories/infrastructure/entities/category.orm-entity';
import { MovementOrmEntity } from './inventory/movements/infrastructure/entities/movement.orm-entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BillingProduct } from './billing/domain/entities/billing-product.entity';
import { BillingService } from './billing/domain/entities/billing-service.entity';
import { BillingTax } from './billing/domain/entities/billing-tax.entity';
import { BillingPaymentMethod } from './billing/domain/entities/billing-payment-method.entity';
import { UserOrmEntity } from './users/infrastructure/entities/user.orm-entity';
import { UserProfileOrmEntity } from './users/infrastructure/entities/user-profile.orm-entity';
import { BillingClient } from './billing/domain/entities/billing-client.entity';
import { BillingTemplatePreference } from './billing/domain/entities/billing-template-preference.entity';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [
    // Load .env variables globally
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeORM with async config from environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5433),
        database: config.get<string>('DB_NAME', 'inventory_db'),
        username: config.get<string>('DB_USER', 'admin'),
        password: config.get<string>('DB_PASSWORD', ''),
        entities: [
          ProductOrmEntity,
          CategoryOrmEntity,
          MovementOrmEntity,
          UserOrmEntity,
          UserProfileOrmEntity,
          BillingProduct,
          BillingService,
          BillingTax,
          BillingPaymentMethod,
          BillingClient,
          BillingTemplatePreference,
        ],
        // synchronize: true creates/updates the table automatically on startup.
        // ⚠️ Set to false in production and use migrations instead.
        synchronize: true,
        logging: ['error', 'warn'],
      }),
    }),

    InventoryModule,
    UsersModule,
    AuthModule,
    BillingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
