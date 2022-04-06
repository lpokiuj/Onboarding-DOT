import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateScheduleDto {
  @IsNotEmpty()
  start_time: string;

  @IsNotEmpty()
  end_time: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  movie_id: number;

  @IsNotEmpty()
  @IsNumber()
  studio_id: number;
}