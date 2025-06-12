import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class QueryGetMostPopularDto {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  limit: number;
}
