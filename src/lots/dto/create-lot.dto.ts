import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateSideDto } from './create-side.dto';

export class CreateLotDto {

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSideDto)
  sides: CreateSideDto[];
}
