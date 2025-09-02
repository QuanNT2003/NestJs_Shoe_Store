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

  @Prop({ require: true })
  description: string;

  @Prop({ require: true })
  cost: number;

  @Prop({ require: true })
  price: number;

  @Prop({ require: true })
  star: number;

  @Prop({ require: true })
  classify: string;

  @Prop({ require: true })
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
