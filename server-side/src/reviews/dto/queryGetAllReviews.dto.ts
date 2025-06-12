import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class QueryGetAllReviewsDto {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  page: number;

  @Min(1)
  @IsInt()
  @Type(() => Number)
  limit: number;
}
