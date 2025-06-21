import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { RoleGuard } from 'src/access-control/guards/role.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, RoleGuard, ConfigService, JwtService],
})
export class ProductsModule {}
