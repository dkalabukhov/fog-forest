import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies?.accessToken; // Берём токен из куки
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate({ id }: { id: string }) {
    return await this.usersService.getById(id);
  }
}
