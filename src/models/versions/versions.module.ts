import { Module } from '@nestjs/common';
import { VersionsService } from './versions.service';
import { VersionsController } from './versions.controller';
import { Version, VersionSchema } from './schemas/version.schema';
import {
  NumberId,
  NumberIdSchema,
} from '../number-id/schemas/number-id.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Version.name, schema: VersionSchema }]),
    MongooseModule.forFeature([
      { name: NumberId.name, schema: NumberIdSchema },
    ]),
  ],
  controllers: [VersionsController],
  providers: [VersionsService],
})
export class VersionsModule {}
