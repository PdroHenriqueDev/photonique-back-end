import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photographers } from 'src/entity';
import { AuthPhotographerDto } from 'src/photographers/DTO/authPhotographer.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from 'src/model/AuthResponse.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Photographers)
    private readonly photographerRepository: Repository<Photographers>,
    private jwtService: JwtService,
  ) {}

  async validatePhotographer(
    authPhotographerDto: AuthPhotographerDto,
  ): Promise<Photographers | null> {
    const { email, password } = authPhotographerDto;

    const photographer = await this.photographerRepository.findOne({
      where: { email },
    });

    if (!photographer) return null;

    const { password: passwordHash } = photographer;

    const passwordIsValid = await bcrypt.compare(password, passwordHash);

    if (!passwordIsValid) return null;

    return photographer;
  }

  async login(authPhotographerDto: AuthPhotographerDto): Promise<AuthResponse> {
    const photographer = await this.validatePhotographer(authPhotographerDto);

    if (!photographer) {
      return {
        statusCode: 401,
        message: 'Credenciais inválidas',
      };
    }

    const { token } = await this.generateToken(authPhotographerDto);

    return {
      statusCode: 200,
      message: 'Seja bem-vindo',
      token,
    };
  }

  async generateToken(authPhotographerDto: AuthPhotographerDto) {
    return {
      token: this.jwtService.sign(authPhotographerDto),
    };
  }
}
