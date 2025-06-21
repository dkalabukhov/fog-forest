import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { RoleGuard } from 'src/access-control/guards/role.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, RoleGuard, ConfigService, JwtService],
})
export class OrdersModule {}
