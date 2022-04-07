import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesService } from 'src/movies/movies.service';
import { StudiosService } from 'src/studios/studios.service';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository : Repository<Schedule>,

    private movieService : MoviesService,
    private studioService : StudiosService
  ){}

  async create(createScheduleDto : CreateScheduleDto){


    const {movie_id, studio_id, ...scheduleDto} = createScheduleDto;

    // Check Movie
    const movieCheck = await this.movieService.getByID(movie_id);
    if(!movieCheck){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        msg: 'Movie not found'
      }, HttpStatus.NOT_FOUND);
    }

    // Check Studio
    const studioCheck = await this.studioService.getByID(studio_id);
    if(!studioCheck){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        msg: 'Studio not found'
      }, HttpStatus.NOT_FOUND);
    }

    const schedule = this.scheduleRepository.create(scheduleDto);
    schedule.movie_id = movieCheck;
    schedule.studio_id = studioCheck;

    const savedSchedule = await this.scheduleRepository.save(schedule);

    const returnMsg = {
      success: true,
      schedule: savedSchedule
    }

    return returnMsg;
  }

  getAll(){
    return this.scheduleRepository.find();
  }

  async getByID(id: string | number){
    if(typeof id === 'number'){
      const schedule = await this.scheduleRepository.findOne(id);
      return schedule;
    }

    const schedule = await this.scheduleRepository.findOne(id);
    if(!schedule){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        msg: 'Schedule not found'
      }, HttpStatus.NOT_FOUND);
    }

    return schedule;
  }
}
