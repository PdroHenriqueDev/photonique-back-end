import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreatePhotographerDto } from 'src/photographers/photographers.dtos';
import { PhotographersService } from 'src/photographers/services/photographers/photographers.service';

@Controller('photographers')
export class PhotographersController {
  constructor(private readonly photographersService: PhotographersService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  createPhotographer(@Body() createPhotographer: CreatePhotographerDto) {
    return this.photographersService.createPhotographer(createPhotographer);
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
