import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateSideDto {
  @IsInt()
  x0: number;

  @IsInt()
  y0: number;

  @IsInt()
  x1: number;

  @IsInt()
  y1: number;
}

export class UpdateSideDto extends CreateSideDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;
}
