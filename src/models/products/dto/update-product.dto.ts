import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class ImageDto {
  @IsString()
  @IsNotEmpty()
  publicId: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class UpdateProductDto {
  @IsOptional()
  _id?: string;

  @IsOptional()
  productId?: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  cost?: number;

  @IsOptional()
  price?: number;

  @IsOptional()
  star?: number;

  @IsOptional()
  classify?: string;

  @IsOptional()
  discount?: number;

  @IsOptional()
  category?: string;

  @IsOptional()
  brand?: string;

  @IsOptional()
  images?: ImageDto[];

  @IsOptional()
  readonly createdAt?: Date;

  @IsOptional()
  readonly updatedAt?: Date;

  @IsOptional()
  readonly __v?: number;
}
