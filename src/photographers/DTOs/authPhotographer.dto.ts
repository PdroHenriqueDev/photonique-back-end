import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthPhotographerDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o email' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher a senha' })
  @MinLength(8, { message: 'A senha precisa no mínimo 8 caracteres' })
  password: string;
}
