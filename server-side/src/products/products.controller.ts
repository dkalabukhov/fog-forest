import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from 'src/access-control/decorators/role.decorator';
import { Role } from 'src/access-control/enums/role';
import { QueryGetAllWithFiltersDto } from './dto/queryGetAllWithFilters.dto';
import { QueryGetMostPopularDto } from './dto/queryGetMostPopular.dto';
import { ProductDto } from './dto/product.dto';
import { ToggleManyDto } from './dto/toggleMany.dto';
import { DeleteManyDto } from './dto/deleteMany.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllWithFilters(@Query() queryDto: QueryGetAllWithFiltersDto) {
    return this.productsService.getAllWithFilters(queryDto);
  }

  @Get('all')
  @Roles(Role.ADMIN)
  async getAll() {
    return await this.productsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }

  @Get('hidden/:id')
  @Roles(Role.ADMIN)
  async getByIdIncludesHidden(@Param('id') id: string) {
    return this.productsService.getByIdIncludesHidden(id);
  }

  @Get('category/:id')
  async getByCategory(@Param('id') id: string) {
    return this.productsService.getByCategory(id);
  }

  @Get('category/hidden/:id')
  @Roles(Role.ADMIN)
  async getByCategoryIncludesHidden(@Param('id') id: string) {
    return this.productsService.getByCategoryIncludesHidden(id);
  }

  @Get('most-popular')
  async getMostPopular(@Query() queryDto: QueryGetMostPopularDto) {
    return this.productsService.getMostPopular(queryDto.limit);
  }

  @Get('similar/:id')
  async getSimilar(@Param('id') id: string) {
    return this.productsService.getSimilar(id);
  }

  @HttpCode(200)
  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() dto: ProductDto) {
    return this.productsService.create(dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Roles(Role.ADMIN)
  async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productsService.updateProduct(id, dto);
  }

  @HttpCode(200)
  @Patch('many/visibility')
  @Roles(Role.ADMIN)
  async toggleProductsVisibility(@Body() ids: ToggleManyDto) {
    return this.productsService.toggleProductsVisibility(ids);
  }

  @HttpCode(200)
  @Patch(':id')
  @Roles(Role.ADMIN)
  async toggleProductVisbility(@Param('id') id: string) {
    return this.productsService.toggleProductVisbility(id);
  }

  @HttpCode(200)
  @Delete('many/delete')
  @Roles(Role.ADMIN)
  async deleteMany(@Body() ids: DeleteManyDto) {
    return this.productsService.deleteMany(ids);
  }

  @HttpCode(200)
  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
