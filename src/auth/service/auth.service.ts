import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from 'src/entity';
import { AuthPhotographerDto } from 'src/photographers/DTO/authPhotographer.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from 'src/interface/AuthResponse';
import { StandardResponse } from 'src/interface/StandartResponse';
import { RoleEnum } from 'src/enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(People)
    private readonly photographerRepository: Repository<People>,
    private jwtService: JwtService,
  ) {}

  async validatePhotographer(
    authPhotographerDto: AuthPhotographerDto,
  ): Promise<People | null> {
    const { email, password } = authPhotographerDto;

    const photographer = await this.photographerRepository.findOne({
      where: { email, role_id: RoleEnum.Photographer },
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

    const { name, email } = photographer;

    const user = {
      name,
      email,
    };

    return {
      statusCode: 200,
      message: 'Seja bem-vindo',
      data: {
        token,
        user,
      },
    };
  }

  async generateToken(authPhotographerDto: AuthPhotographerDto) {
    return {
      token: this.jwtService.sign(authPhotographerDto),
    };
  }

  verifyToken(token: string): StandardResponse<string> {
    if (!token) {
      return {
        statusCode: 401,
        message: 'Não autorizado',
        data: 'Token inválido',
      };
    }

    try {
      this.jwtService.verify(token);
      return {
        statusCode: 200,
        message: 'Seja bem-vindo',
        data: 'Token válido',
      };
    } catch (error) {
      return {
        statusCode: 401,
        message: 'Não autorizado',
        data: 'Token inválido',
      };
    }
  }
}
