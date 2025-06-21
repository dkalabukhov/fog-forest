import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { RoleGuard } from 'src/access-control/guards/role.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService, RoleGuard, ConfigService, JwtService],
})
export class FilesModule {}
