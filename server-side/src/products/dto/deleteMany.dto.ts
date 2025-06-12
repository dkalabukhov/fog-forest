import { IsArray } from 'class-validator';
import { IsPrismaCuid } from '../decorators/isPrismaCuid.decorator';

export class DeleteManyDto {
  @IsArray()
  @IsPrismaCuid({ each: true })
  ids: string[];
}
