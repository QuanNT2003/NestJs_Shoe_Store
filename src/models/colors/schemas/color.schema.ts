import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ColorDocument = HydratedDocument<Color>;

@Schema({ timestamps: true })
export class Color {
  @Prop({ type: String, require: true })
  name: string;

  @Prop({ require: true, unique: true })
  colorId: string;

  @Prop()
  colorNameOne: string;

  @Prop()
  colorOneCode: string;

  @Prop()
  colorNameTwo: string;

  @Prop()
  colorTwoCode: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
