import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AcessControlModule } from './access-control/shared/access-control.module';
import { FilesModule } from './files/files.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    AcessControlModule,
    FilesModule,
    OrdersModule,
    ProductsModule,
    ReviewsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
