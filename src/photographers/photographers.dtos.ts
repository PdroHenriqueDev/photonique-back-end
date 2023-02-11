import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePhotographerDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
