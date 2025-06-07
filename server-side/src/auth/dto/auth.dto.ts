import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @IsEmail(undefined, { message: 'Некорректная почта' })
  @IsString({ message: 'Почта должна быть строкой' })
  email: string;

  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;
}
