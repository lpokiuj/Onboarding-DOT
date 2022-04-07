import { Body, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository : Repository<Movie>,

    private tagService : TagsService
  ){}
  
  async create(createMovieDto : CreateMovieDto){
    
    const { tags, ...movieData } = createMovieDto;

    // Save Movie
    const movie = this.movieRepository.create(movieData);
    
    const createdTags = [];
    for (const tag of tags) {
      createdTags.push(await this.tagService.getByName(tag));
    }

    movie.tags = createdTags;

    await this.movieRepository.save(movie);
    
    const returnMsg = {
      success: true,
      data: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        tags: movie.tags
      },
      message: 'Movie Added'
    }

    return returnMsg;
  }

  getAll(){
    return this.movieRepository.find();
  }

  async getByID(id: string | number){
    
    // For Schedule
    if(typeof id === 'number'){
      const movie = await this.movieRepository.findOne(id);
      return movie;
    }

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
