import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        favorites: true,
        orders: true,
      },
    });

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        favorites: true,
        orders: true,
      },
    });

    return user;
  }

  async toggleFavoriteProduct(
    userId: string,
    productId: string,
  ): Promise<{ action: 'added' | 'removed' }> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new BadRequestException('Продукт с таким id не существует');
    }

    const existingFavorite = await this.prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingFavorite) {
      await this.prisma.favorite.delete({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });
      return { action: 'removed' };
    } else {
      await this.prisma.favorite.create({
        data: {
          userId,
          productId,
        },
      });
      return { action: 'added' };
    }
  }

  async create(dto: AuthDto) {
    const { name, email, password } = dto;

    return await this.prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password),
      },
    });
  }
}
