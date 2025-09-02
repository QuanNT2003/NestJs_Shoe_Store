import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Color } from 'src/models/colors/schemas/color.schema';
import { Size } from 'src/models/sizes/schemas/size.schema';

export type VersionDocument = HydratedDocument<Version>;

@Schema({ timestamps: true })
export class Version {
  @Prop({ require: true, unique: true })
  versionId: string;

  @Prop({ require: true })
  productId: string;

  @Prop({ require: true })
  inStock: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Size.name })
  size: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Color.name })
  color: mongoose.Schema.Types.ObjectId;
}
export const VersionSchema = SchemaFactory.createForClass(Version);
