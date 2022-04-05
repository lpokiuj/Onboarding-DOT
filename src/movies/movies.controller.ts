import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  addMovie(@Body() createMovieDto : CreateMovieDto){
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  getAllMovie(){
    return this.moviesService.getAll();
  }

  @Get(':id')
  getMovieByID(@Param('id') id: string){
    return this.moviesService.getByID(id);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string){
    return this.moviesService.delete(id);
  }
}
