import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class ReviewDto {
  @IsString({ message: 'Текст отзыва должен быть строкой' })
  @IsNotEmpty({ message: 'Текст отзыва не может быть пустым' })
  text: string;

  @Max(5, { message: 'Рейтинг отзыва должен быть не более 5' })
  @Min(1, { message: 'Рейтинг отзыва должен быть не менее 1' })
  @IsInt({ message: 'Отзыв должен быть целым числом' })
  rating: number;
}
