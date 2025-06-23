import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/access-control/decorators/role.decorator';
import { Role } from 'src/access-control/enums/role';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';
import { RoleGuard } from 'src/access-control/guards/role.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  async getAll() {
    return this.reviewsService.getAll();
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
