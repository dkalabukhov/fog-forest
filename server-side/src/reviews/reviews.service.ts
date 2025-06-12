import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { QueryGetAllReviewsDto } from './dto/queryGetAllReviews.dto';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  async getAll(dto: QueryGetAllReviewsDto) {
    const { page, limit } = dto;
    return this.prisma.review.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getById(id: string, userId: string) {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        user: true,
      },
    });

    if (!review) {
      throw new NotFoundException('Отзыв не найден или вы не его автор');
    }
  }

  async create(userId: string, productId: string, dto: ReviewDto) {
    await this.usersService.getById(userId);
    await this.productsService.getById(productId);

    return await this.prisma.review.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }

  async delete(id: string, userId: string) {
    await this.getById(id, userId);

    return await this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
