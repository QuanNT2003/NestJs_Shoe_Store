import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './models/categories/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ColorsModule } from './models/colors/colors.module';
import { BrandsModule } from './models/brands/brands.module';
import { ProductsModule } from './models/products/products.module';
import { VersionsModule } from './models/versions/versions.module';
import { SizesModule } from './models/sizes/sizes.module';
import { NumberIdModule } from './models/number-id/number-id.module';
@Module({
  imports: [
    CategoriesModule,
    BrandsModule,
    ProductsModule,
    VersionsModule,
    SizesModule,
    ColorsModule,
    NumberIdModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
