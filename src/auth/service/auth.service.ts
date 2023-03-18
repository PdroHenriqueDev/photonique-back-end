import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photographers } from 'src/entities';
import { AuthPhotographerDto } from 'src/photographers/DTOs/authPhotographer.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from 'src/models/AuthResponse.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Photographers)
    private readonly photographerRepository: Repository<Photographers>,
    private jwtService: JwtService,
  ) {}

  async validatePhotographer(
    authPhotographerDto: AuthPhotographerDto,
  ): Promise<AuthResponse> {
    const { email, password } = authPhotographerDto;

    const photographer = await this.photographerRepository.findOne({
      where: { email },
    });

    if (!photographer) {
      return {
        statusCode: 400,
        message: 'Credenciais inválida',
      };
    }

    const { password: passwordHash } = photographer;

    const passwordIsValid = await bcrypt.compare(password, passwordHash);

    if (!passwordIsValid) {
      return {
        statusCode: 401,
        message: 'Credenciais inválida',
      };
    }

    const { token } = await this.generateToken(email);

    return {
      statusCode: 200,
      message: 'Seja bem-vindo',
      token,
    };
  }

  async generateToken(email: string) {
    const secret = process.env.JWT_SECRET;

    return {
      token: this.jwtService.sign(
        { email },
        {
          secret,
          expiresIn: '50s',
        },
      ),
    };
  }
}
