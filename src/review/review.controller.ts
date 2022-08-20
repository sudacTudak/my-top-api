import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {
    return null;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return null;
  }

  @Get('byProduct/:productId')
  async findByProduct(
    @Param('productId') productId: string,
  ): Promise<ReviewModel[]> {
    return null;
  }
}
