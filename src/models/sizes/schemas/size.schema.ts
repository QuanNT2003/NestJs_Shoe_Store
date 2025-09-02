import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SizeDocument = HydratedDocument<Size>;

@Schema({ timestamps: true })
export class Size {
  @Prop({ required: true, unique: true })
  sizeId: string;
  @Prop({ required: true })
  name: string;
}

export const SizeSchema = SchemaFactory.createForClass(Size);
