import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (
  configService: ConfigService,
  // eslint-disable-next-line
): Promise<JwtModuleOptions> => ({
  secret: configService.get('JWT_SECRET'),
});
