import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { StaticDataService } from '../service/static-data.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('tatic')
@Controller('static-data/categories')
export class StaticDataController {
  constructor(private readonly staticDataService: StaticDataService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllCategories(@Res() res: Response) {
    const serviceResponse = await this.staticDataService.findAllCategories();
    const { statusCode } = serviceResponse;
    return res.status(statusCode).json(serviceResponse);
  }
}
