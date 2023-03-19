import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPhotographerDto } from 'src/photographers/DTOs/authPhotographer.dto';
import { AuthService } from './service/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(authPhotographer: AuthPhotographerDto) {
    const photographer = await this.authService.validatePhotographer(
      authPhotographer,
    );
    if (!photographer) {
      throw new UnauthorizedException();
    }
    return photographer;
  }
}
