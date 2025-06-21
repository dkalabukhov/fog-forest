import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { RoleGuard } from 'src/access-control/guards/role.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ReviewsController],
  providers: [
    ReviewsService,
    UsersService,
    ProductsService,
    RoleGuard,
    ConfigService,
    JwtService,
  ],
})
export class ReviewsModule {}
