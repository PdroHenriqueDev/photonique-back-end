import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileUploadDto } from 'src/photographers/DTO/fileUpload.dto';

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

  @Post('photo/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload photo',
    type: FileUploadDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
      }),
    }),
  )
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.photographersService.uploadPhoto(file);
  }
}
