import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() dto: Omit<ProductModel, '_id'>) {
    return null;
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<ProductModel | null> {
    return null;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return null;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {
    return null;
  }

  @Post()
  @HttpCode(200)
  async find(@Body() dto: FindProductDto) {
    return null;
  }
}
