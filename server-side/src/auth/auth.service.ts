import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  ACCESS_TOKEN_NAME = 'accessToken';
  EXPIRE_DAY_ACCESS_TOKEN = 1;

  REFRESH_TOKEN_NAME = 'refreshToken';
  EXPIRE_DAY_REFRESH_TOKEN = 7;

  constructor(
    private jwt: JwtService,
    private usersService: UsersService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    if (!user.password) {
      throw new NotFoundException(`Этот пользователь зарегистрирован
        через OAuth. Используйте соответствующий метод входа.`);
    }

    const passwordMatch = await verify(user.password, dto.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const tokens = this.issueTokens(user.id, user.role);

    return { user, ...tokens };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.usersService.getByEmail(dto.email);

    if (oldUser) {
      throw new BadRequestException('Пользователь уже существует');
    }

    const user = await this.usersService.create(dto);
    const tokens = this.issueTokens(user.id, user.role);

    return { user, ...tokens };
  }

  async validateOAuthLogin(req: Request) {
    const userData = req.user as {
      email: string;
      name: string;
      picture: string;
    };

    const { email, name, picture } = userData;

    if (!userData) {
      throw new UnauthorizedException('Ошибка логина через google');
    }

    let user = await this.usersService.getByEmail(userData.email);

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          picture,
        },
        include: {
          favorites: true,
          orders: true,
        },
      });
    }

    const tokens = this.issueTokens(user.id, user.role);

    return { user, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    const result: { id: string } = await this.jwt.verifyAsync(refreshToken);

    if (!result) {
      throw new UnauthorizedException('Невалидный refresh token');
    }

    const user = await this.usersService.getById(result.id);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const tokens = this.issueTokens(user.id, user.role);

    return { user, ...tokens };
  }

  issueTokens(userId: string, role: string) {
    const data = { id: userId, role };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1d',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.usersService.getByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      expires: expiresIn,
      domain: this.configService.getOrThrow('SERVER_DOMAIN'),
      secure: true,
      sameSite: 'none',
    });
  }

  addAcessTokenToResponse(res: Response, accessToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_ACCESS_TOKEN);

    res.cookie(this.ACCESS_TOKEN_NAME, accessToken, {
      httpOnly: true,
      expires: expiresIn,
      domain: this.configService.getOrThrow('SERVER_DOMAIN'),
      secure: true,
      sameSite: 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      expires: new Date(0),
      domain: this.configService.getOrThrow('SERVER_DOMAIN'),
      secure: true,
      sameSite: 'none',
    });
  }

  removeAcessTokenFromResponse(res: Response) {
    res.cookie(this.ACCESS_TOKEN_NAME, '', {
      httpOnly: true,
      expires: new Date(0),
      domain: this.configService.getOrThrow('SERVER_DOMAIN'),
      secure: true,
      sameSite: 'none',
    });
  }
}
