import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ timestamps: true })
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop()
  brandId: string;

  @Prop({
    type: [
      {
        publicId: { type: String },
        url: { type: String },
      },
    ],
  })
  images: { publicId: string; url: string }[];

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  note: string;

  @Prop()
  web: string;

  @Prop()
  nation: string;
}
export const BrandSchema = SchemaFactory.createForClass(Brand);
