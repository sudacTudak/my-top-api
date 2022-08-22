import { IsString, Length } from 'class-validator';

export class AuthDto {
  @IsString()
  login: string;

  @IsString()
  @Length(6, undefined, { message: 'Минимальная длина пароля - 6 символов' })
  password: string;
}
