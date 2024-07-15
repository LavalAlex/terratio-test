import { IsInt, IsNumber, IsPositive } from 'class-validator';

import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PointDto {
  @IsInt()
  x: number;

  @IsInt()
  y: number;
}

export class CreateSideDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PointDto)
  points: PointDto[];
}

export class UpdateSideDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}
