import { IsISO8601, IsNotEmpty, IsNumber } from "class-validator";

export class CreateScheduleDto {
  @IsNotEmpty()
  start_time: string;

  @IsNotEmpty()
  end_time: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsISO8601({}, {
    message: 'date must be YYYY-MM-DD'
  })
  date: string;

  @IsNotEmpty()
  @IsNumber()
  movie_id: number;

  @IsNotEmpty()
  @IsNumber()
  studio_id: number;
}