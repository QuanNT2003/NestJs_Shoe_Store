import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class ImageDto {
  @IsString()
  @IsNotEmpty()
  publicId: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  images?: ImageDto[];

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  address: string;
}
