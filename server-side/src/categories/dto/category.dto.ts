import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({ message: 'Название не должно быть пустым' })
  @IsString({ message: 'Название должно быть строкой' })
  title: string;

  @IsNotEmpty({ message: 'Описание не должно быть пустым' })
  @IsString({ message: 'Описание должно быть строкой' })
  description: string;
}
