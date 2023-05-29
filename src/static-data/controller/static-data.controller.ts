import { Controller, Get, Res } from '@nestjs/common';
import { StaticDataService } from '../service/static-data.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('tatic')
@Controller('static-data')
export class StaticDataController {
  constructor(private readonly staticDataService: StaticDataService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const serviceResponse = await this.staticDataService.findAll();
    const { statusCode } = serviceResponse;
    return res.status(statusCode).json(serviceResponse);
  }
}
