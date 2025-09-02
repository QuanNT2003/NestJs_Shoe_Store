import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty()
  @IsString()
  sizeId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
