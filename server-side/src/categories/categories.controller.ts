import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { Roles } from 'src/access-control/decorators/role.decorator';
import { Role } from 'src/access-control/enums/role';

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
  async create(@Body() dto: CategoryDto) {
    return this.categoriesService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}
