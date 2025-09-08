import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class AuthRegisterDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsOptional()
  name: string;
}
