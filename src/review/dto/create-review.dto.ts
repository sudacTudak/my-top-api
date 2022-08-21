import { IsNumber, IsString, Max, Min, min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Min(1, { message: 'Рейтинг должен быть не меньше 1' })
  @Max(5, { message: 'Рейтинг должен быть не больше 5' })
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
