import { Body, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository : Repository<Movie>,
  ){}
  
  create(createMovieDto : CreateMovieDto){
    
    // Save Movie
    const movie = this.movieRepository.create(createMovieDto);
    movie.play_until = new Date();
    movie.created_at = new Date();
    movie.updated_at = new Date();

    this.movieRepository.save(movie);

    const returnMsg = {
      success: true,
      data: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        play_until: movie.play_until
      },
      message: 'Movie Added'
    }

    return returnMsg;
  }

  getAll(){
    return this.movieRepository.find();
  }

  async getByID(id: string){

    const movie = await this.movieRepository.findOne(id);
    
    // If movie not found
    if(!movie){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Movie not found'
      }, HttpStatus.NOT_FOUND)
    }

    return movie;
  }

  async delete(id: string){
    const movie = await this.movieRepository.findOne(id);
    
    // If movie not found
    if(!movie){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Movie not found'
      }, HttpStatus.NOT_FOUND)
    }

    await this.movieRepository.delete(movie);

    const returnMsg = {
      success: true
    }
    return returnMsg;
  }


}
