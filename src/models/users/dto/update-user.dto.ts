import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class ImageDto {
  @IsString()
  @IsNotEmpty()
  publicId: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class UpdateUserDto {
  @IsOptional()
  _id?: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  userId: string;

  @IsOptional()
  images?: ImageDto[];

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  role: string;

  @IsOptional()
  accountType: string;

  @IsOptional()
  isActive: string;

  @IsOptional()
  codeId: string;

  @IsOptional()
  codeExpired: Date;

  @IsOptional()
  readonly createdAt?: Date;

  @IsOptional()
  readonly updatedAt?: Date;

  @IsOptional()
  readonly __v?: number;
}
