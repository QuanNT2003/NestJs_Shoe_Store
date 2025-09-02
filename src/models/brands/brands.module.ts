import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { Brand, BrandSchema } from './schemas/brand.schema';
import {
  NumberId,
  NumberIdSchema,
} from '../number-id/schemas/number-id.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    MongooseModule.forFeature([
      { name: NumberId.name, schema: NumberIdSchema },
    ]),
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
