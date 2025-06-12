import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.category.findMany();
  }

  async getById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    return category;
  }

  async create(dto: CategoryDto) {
    const { title, description } = dto;

    return await this.prisma.category.create({
      data: {
        title,
        description,
      },
    });
  }

  async update(id: string, dto: CategoryDto) {
    await this.getById(id);

    return await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
