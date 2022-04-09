import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  overview: string;

  @IsNotEmpty()
  @IsISO8601({}, {
    message: 'play_until must be YYYY-MM-DD'
  })
  play_until: string;

  @IsNotEmpty()
  @IsString({ each: true })
  tags: string[];
}