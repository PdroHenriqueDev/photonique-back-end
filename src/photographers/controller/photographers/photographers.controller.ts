import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreatePhotographerDto } from 'src/photographers/DTO/photographers.dtos';
import { PhotographersService } from 'src/photographers/service/photographers/photographers.service';

@ApiTags('photographers')
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  getUsers() {
    return this.photographersService.findPhotographers();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findPhotographerById(@Param('id', ParseIntPipe) id: number) {
    return this.photographersService.findPhotographerById(id);
  }
}
