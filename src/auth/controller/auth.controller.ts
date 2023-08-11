import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
  Headers,
  Get,
} from '@nestjs/common';
import { AuthPhotographerDto } from 'src/photographers/DTO/authPhotographer.dto';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('')
  @UsePipes(ValidationPipe)
  async login(
    @Body() authPhotographer: AuthPhotographerDto,
    @Res() res: Response,
  ) {
    const serviceResponse = await this.authService.login(authPhotographer);

    const { statusCode } = serviceResponse;

    return res.status(statusCode).json(serviceResponse);
  }

  @Get('verify-token')
  async verifyToken(
    @Headers('authorization') authorization: string,
    @Res() res: Response,
  ) {
    const [, token] = authorization?.length > 0 ? authorization.split(' ') : '';
    const serviceResponse = await this.authService.verifyToken(token);
    const { statusCode, data } = serviceResponse;

    return res.status(statusCode).json(data);
  }
}
