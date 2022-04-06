import { IsAlphanumeric, IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  overview: string;

  @IsNotEmpty()
  @IsString({ each: true })
  tags: string[];
}