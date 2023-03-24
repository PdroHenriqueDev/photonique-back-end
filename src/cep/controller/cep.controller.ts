import {
  Controller,
  Get,
  Param,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CepService } from '../service/cep.service';
import { Response } from 'express';

@ApiTags('cep')
@Controller('cep')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Get(':cep')
  @UsePipes(ValidationPipe)
  async createPhotographer(@Res() res: Response, @Param('cep') cep: string) {
    const serviceResponse = await this.cepService.getCepInfo(cep);

    const { statusCode } = serviceResponse;

    return res.status(statusCode).json(serviceResponse);
  }
}
