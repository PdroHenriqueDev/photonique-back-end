import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class EventDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o nome' })
  @MinLength(3, { message: 'O nome precisa no mínimo 3 caracteres' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o local' })
  @MinLength(3, { message: 'O local precisa no mínimo 3 caracteres' })
  local: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher a categoria' })
  category_id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher o estado' })
  state: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher a cidade' })
  city: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'É necessário preencher a data' })
  date: string;
}
