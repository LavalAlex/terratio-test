import { IsNumber } from 'class-validator';

export class CreateSideDto {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}
