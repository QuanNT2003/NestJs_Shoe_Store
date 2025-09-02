import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class ImageDto {
  @IsString()
  @IsNotEmpty()
  publicId: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateBrandDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  images?: ImageDto[];

  @IsOptional()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  note?: string;

  @IsOptional()
  web?: string;

  @IsOptional()
  nation?: string;
}
