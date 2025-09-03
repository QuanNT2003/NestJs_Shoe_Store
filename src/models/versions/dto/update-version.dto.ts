import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateVersionDto {
  @IsOptional()
  _id?: string;

  @IsNotEmpty({ message: 'Product Id is required' })
  productId: string;

  @IsNotEmpty({ message: 'Size is required' })
  size: string;

  @IsNotEmpty({ message: 'Color is required' })
  color: string;

  @IsOptional()
  inStock: number;
}
