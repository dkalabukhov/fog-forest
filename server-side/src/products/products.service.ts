import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductWithRelations } from './products.model';
import { QueryGetAllWithFiltersDto } from './dto/queryGetAllWithFilters.dto';
import { ProductDto } from './dto/product.dto';
import { ToggleManyDto } from './dto/toggleMany.dto';
import { DeleteManyDto } from './dto/deleteMany.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllWithFilters(dto: QueryGetAllWithFiltersDto) {
    if (dto.searchTerm) {
      return await this.prisma.product.findMany({
        where: {
          OR: [
            {
              title: {
                search: dto.searchTerm
                  .replace(/[.,/#!$%^&*;:{}=_`~()-]/g, '')
                  .replace(/\s+/g, ' ')
                  .trim()
                  .split(' ')
                  .join(' | '),
              },
            },
            {
              description: {
                search: dto.searchTerm
                  .replace(/[.,/#!$%^&*;:{}=_`~()-]/g, '')
                  .replace(/\s+/g, ' ')
                  .trim()
                  .split(' ')
                  .join(' | '),
              },
            },
          ],
          isAvailable: true,
        },
        include: {
          category: true,
          reviews: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    if (dto.page && dto.limit) {
      return await this.prisma.product.findMany({
        where: {
          isAvailable: true,
        },
        skip: (dto.page - 1) * dto.limit,
        take: dto.limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          category: true,
          reviews: true,
        },
      });
    }

    return await this.prisma.product.findMany({
      where: {
        isAvailable: true,
      },
      include: {
        category: true,
        reviews: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAll() {
    return await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
        reviews: true,
      },
    });
  }

  async getById(id: string): Promise<ProductWithRelations> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
        isAvailable: true,
      },
      include: {
        category: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    return product;
  }

  async getByIdIncludesHidden(id: string): Promise<ProductWithRelations> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        reviews: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    return product;
  }

  async getByCategory(categoryId: string) {
    const products = await this.prisma.product.findMany({
      where: {
        categoryId,
        isAvailable: true,
      },
      include: {
        category: true,
        reviews: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  }

  async getByCategoryIncludesHidden(categoryId: string) {
    const products = await this.prisma.product.findMany({
      where: {
        categoryId,
      },
      include: {
        category: true,
        reviews: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  }

  async getMostPopular(limit: number) {
    const mostPopularProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    const productIds = mostPopularProducts.map((item) => item.productId);

    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include: {
        category: true,
      },
      take: limit,
    });

    return products;
  }

  async getSimilar(id: string) {
    const currentProduct = await this.getById(id);

    if (!currentProduct) {
      throw new NotFoundException('Товар не найден');
    }

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          title: currentProduct.category.title,
        },
        isAvailable: true,
        NOT: {
          id: currentProduct.id,
        },
      },
    });

    return products;
  }

  async updateProduct(id: string, dto: ProductDto) {
    await this.getByIdIncludesHidden(id);

    return await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async toggleProductVisbility(id: string) {
    const product = await this.getByIdIncludesHidden(id);

    return await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        isAvailable: !product.isAvailable,
      },
    });
  }

  async toggleProductsVisibility(dto: ToggleManyDto) {
    const { ids } = dto;

    const products = await Promise.all(
      ids.map((id) => this.getByIdIncludesHidden(id)),
    );

    const shouldEnable = products.some((product) => !product.isAvailable);

    return await this.prisma.product.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        isAvailable: shouldEnable,
      },
    });
  }

  async delete(id: string) {
    await this.getByIdIncludesHidden(id);

    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async deleteMany(dto: DeleteManyDto) {
    const { ids } = dto;

    for (const id of ids) {
      await this.getByIdIncludesHidden(id);
    }

    return await this.prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async create(dto: ProductDto) {
    return await this.prisma.product.create({
      data: {
        ...dto,
      },
    });
  }
}
