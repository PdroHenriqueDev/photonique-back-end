import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { CreatePhotographerDto } from 'src/photographers/photographers.dtos';
import { PhotographersService } from 'src/photographers/services/photographers/photographers.service';

@Controller('photographers')
export class PhotographersController {
  constructor(private readonly photographersService: PhotographersService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createPhotographer(
    @Body() createPhotographer: CreatePhotographerDto,
    @Res() res: Response,
  ) {
    const serviceResponse = await this.photographersService.createPhotographer(
      createPhotographer,
    );

    const { statusCode } = serviceResponse;

    return res.status(statusCode).json(serviceResponse);
  }

  @Get()
  getUsers() {
    return this.photographersService.findPhotographers();
  }

  @Get(':id')
  findPhotographerById(@Param('id', ParseIntPipe) id: number) {
    return this.photographersService.findPhotographerById(id);
  }
}
