import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class QueryGetAllWithFiltersDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  searchTerm: string;

  @IsOptional()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  limit: number;
}
