import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NumberIdDocument = HydratedDocument<NumberId>;

@Schema({ timestamps: true })
export class NumberId {
  @Prop({ require: true, unique: true })
  numberId: number;
  @Prop({ require: true })
  name: string;
}

export const NumberIdSchema = SchemaFactory.createForClass(NumberId);
