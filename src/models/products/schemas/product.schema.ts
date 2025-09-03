import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Brand } from 'src/models/brands/schemas/brand.schema';
import { Category } from 'src/models/categories/schemas/category.schema';

export type ProductDocument = HydratedDocument<Product>;
@Schema({ timestamps: true })
export class Product {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true, unique: true })
  productId: string;

  @Prop()
  description: string;

  @Prop()
  cost: number;

  @Prop()
  price: number;

  @Prop()
  star: number;

  @Prop()
  classify: string;

  @Prop()
  discount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  category: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Brand.name })
  brand: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [
      {
        publicId: { type: String },
        url: { type: String },
      },
    ],
  })
  images: { publicId: string; url: string }[];
}
export const ProductSchema = SchemaFactory.createForClass(Product);
