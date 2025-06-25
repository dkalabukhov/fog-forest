import { Controller, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @Auth()
  getFavorites(@CurrentUser('id') userId: string) {
    return this.favoritesService.getFavorites(userId);
  }
}
