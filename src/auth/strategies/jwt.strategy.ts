import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject } from '@nestjs/common';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../services/auth.service';
import { Token } from '../models/token.model';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.apiKey,
    });
  }

  validate(payload: Token): Token {
    return { sub: payload.sub };
  }
}
