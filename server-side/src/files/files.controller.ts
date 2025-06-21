import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Roles } from 'src/access-control/decorators/role.decorator';
import { Role } from 'src/access-control/enums/role';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from 'src/access-control/guards/role.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder?: string,
  ) {
    return this.filesService.saveFiles(files, folder);
  }
}
