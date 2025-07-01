import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '../enums/role';
import { Reflector } from '@nestjs/core';
import { AccessControlService } from '../shared/access-control.service';
import { ROLE_KEY } from '../decorators/role.decorator';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../types/payload';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessControlService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request: Request = context.switchToHttp().getRequest();
    const cookies = request.cookies as Record<string, string | undefined>;
    const token = cookies.accessToken;

    if (!token) {
      throw new UnauthorizedException('Токен не найден в cookie');
    }

    const payload: Payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
    });

    for (const role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({
        requiredRole: role,
        currentRole: payload.role,
      });

      if (result) {
        return true;
      }
    }

    return false;
  }
}
