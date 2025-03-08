import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'EMPLOYEES', 'ADMIN'], {
    message: 'valid role is being required',
  })
  role: 'INTERN' | 'EMPLOYEES' | 'ADMIN';
}
