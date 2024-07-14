import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateSideDto } from './create-side.dto';

export class CreateLotDto {
  @IsString()
  @IsOptional()
  reference?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSideDto)
  sides: [CreateSideDto];
}
