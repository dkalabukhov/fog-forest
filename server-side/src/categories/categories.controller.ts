import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { Roles } from 'src/access-control/decorators/role.decorator';
import { Role } from 'src/access-control/enums/role';
import { RoleGuard } from 'src/access-control/guards/role.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAll() {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.categoriesService.getById(id);
  }

  @HttpCode(200)
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Auth()
  async create(@Body() dto: CategoryDto) {
    return this.categoriesService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Auth()
  async update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Auth()
  async delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}
