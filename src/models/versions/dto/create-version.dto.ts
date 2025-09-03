import { IsNotEmpty } from 'class-validator';

export class CreateVersionDto {
  @IsNotEmpty({ message: 'Product Id is required' })
  productId: string;

  @IsNotEmpty({ message: 'Size is required' })
  size: string;

  @IsNotEmpty({ message: 'Color is required' })
  color: string;
}
