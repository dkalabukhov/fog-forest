import { Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.usersService.getById(id);
  }

  @Patch('profile/favorites/:productId')
  @Auth()
  async toggleFavoriteProduct(
    @CurrentUser('id') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.usersService.toggleFavoriteProduct(userId, productId);
  }
}
