import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { OrderDto } from './dto/order.dto';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { Roles } from 'src/access-control/decorators/role.decorator';
import { Role } from 'src/access-control/enums/role';
import { RoleGuard } from 'src/access-control/guards/role.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(200)
  @Post('place')
  @Auth()
  async checkout(@Body() dto: OrderDto, @CurrentUser('id') userId: string) {
    return this.ordersService.createPayment(dto, userId);
  }

  @HttpCode(200)
  @Post('status')
  async updateStatus(@Body() yookassa: any) {
    // eslint-disable-next-line
    return this.ordersService.updateStatus(yookassa);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  async getAllOrders() {
    return this.ordersService.getAllOrders();
  }
}
