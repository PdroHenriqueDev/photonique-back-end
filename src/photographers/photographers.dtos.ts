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
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o email' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher a senha' })
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o campo cpf' })
  @Validate(IsCpf)
  cpf: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o campo gênero' })
  @IsNumberString()
  gender_id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o telefone/celular' })
  @MinLength(5)
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o cep' })
  @MinLength(8)
  zip_code: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o Estado' })
  @MinLength(2)
  state: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher a Cidade' })
  @MinLength(2)
  city: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o endereço' })
  @MinLength(5)
  address: string;
}
