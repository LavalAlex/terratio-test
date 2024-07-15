import {
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNumber,
  IsInt,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateSideDto, UpdateSideDto } from './side.dto';

export class CreatePlotDto {
  @IsString()
  @IsOptional()
  reference?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSideDto)
  sides: CreateSideDto[];
}

export class UpdatePlotDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @IsOptional()
  reference?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSideDto)
  sides: [UpdateSideDto];
}
