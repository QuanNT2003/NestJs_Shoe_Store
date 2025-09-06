import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty()
  @IsString()
  sizeId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
