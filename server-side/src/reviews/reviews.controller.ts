import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { QueryGetAllReviewsDto } from './dto/queryGetAllReviews.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/access-control/decorators/role.decorator';
import { Role } from 'src/access-control/enums/role';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @Roles(Role.ADMIN)
  async getAll(@Query() queryDto: QueryGetAllReviewsDto) {
    return this.reviewsService.getAll(queryDto);
  }

  @HttpCode(200)
  @Post(':productId')
  @Auth()
  async create(
    @CurrentUser('id') userId: string,
    @Param('productId') productId: string,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewsService.create(userId, productId, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.reviewsService.delete(id, userId);
  }
}
