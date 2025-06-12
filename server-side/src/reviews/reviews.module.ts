import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, UsersService, ProductsService],
})
export class ReviewsModule {}
