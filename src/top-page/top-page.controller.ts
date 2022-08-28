import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import {
  ALREADY_EXISTED_ALIAS_ERROR,
  NOT_FOUND_PAGE_ERROR,
} from './top-page.constants';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateTopPageDto): Promise<TopPageModel> {
    const existedTopPage = await this.topPageService.findByAlias(dto.alias);

    if (existedTopPage) {
      throw new BadRequestException(ALREADY_EXISTED_ALIAS_ERROR);
    }

    return await this.topPageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(
    @Param('id', IdValidationPipe) id: string,
  ): Promise<TopPageModel | null> {
    const topPage = await this.topPageService.findById(id);

    if (!topPage) {
      throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
    }
    return topPage;
  }

  @Get('byAlias/:alias')
  async getByAlias(
    @Param('alias') alias: string,
  ): Promise<TopPageModel | null> {
    const topPage = await this.topPageService.findByAlias(alias);

    if (!topPage) {
      throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
    }
    return topPage;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedTopPage = await this.topPageService.deleteById(id);

    if (!deletedTopPage) {
      throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateTopPageDto,
  ) {
    const updatedTopPage = await this.topPageService.updateById(id, dto);

    if (!updatedTopPage) {
      throw new NotFoundException(NOT_FOUND_PAGE_ERROR);
    }

    return updatedTopPage;
  }

  @UsePipes(new ValidationPipe())
  @Post('find')
  @HttpCode(200)
  async find(@Body() dto: FindTopPageDto) {
    return await this.topPageService.findByFirstCategory(dto.firstCategory);
  }

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return await this.topPageService.findByText(text);
  }
}
