import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsCpf } from '../validators/isCpf';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotographerDto {
  created_on: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o nome' })
  @MinLength(3, { message: 'O nome precisa ter no mínimo 3 caracteres' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o email' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher a senha' })
  @MinLength(8, { message: 'A senha precisa no mínimo 8 caracteres' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o campo cpf' })
  @Validate(IsCpf, { message: 'CPF inválido' })
  cpf: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o campo gênero' })
  @IsNumberString({}, { message: 'Genêro inválido' })
  gender_id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o telefone/celular' })
  @MinLength(5, { message: 'Número inválido' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o cep' })
  @MinLength(8, { message: 'CEP inválido' })
  zip_code: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o Estado' })
  @MinLength(2, { message: 'Estado inválido' })
  state: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher a Cidade' })
  @MinLength(2, { message: 'Cidade inválido' })
  city: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o endereço' })
  @MinLength(5, { message: 'Endereço precisa de mais detalhes' })
  address: string;
}
