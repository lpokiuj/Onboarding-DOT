import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudioDto } from './dto/create-studio.dto';
import { Studio } from './entities/studio.entity';

@Injectable()
export class StudiosService {
  constructor(
    @InjectRepository(Studio)
    private readonly studioRepository : Repository<Studio>
  ){}

  create(createStudioDto : CreateStudioDto){
    
    // Save Studio
    const studio = this.studioRepository.create(createStudioDto);
    studio.created_at = new Date();
    studio.updated_at = new Date();

    this.studioRepository.save(studio);

    const returnMsg = {
      success: true,
      data: {
        id: studio.id,
        studio_number: studio.studio_number,
        seat_capacity: studio.seat_capacity
      },
      message: 'Studio Added'
    }

    return returnMsg;
  }

  getAll(){
    return this.studioRepository.find();
  }

  async getByID(id: string){
    
    const studio = await this.studioRepository.findOne(id);

    // If studio not found
    if(!studio){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Studio not found'
      }, HttpStatus.NOT_FOUND)
    }

    return studio;
  }

  async delete(id: string){

    const studio = await this.studioRepository.findOne(id);

    // If studio not found
    if(!studio){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Studio not found'
      }, HttpStatus.NOT_FOUND)
    }

    await this.studioRepository.delete(studio)

    const returnMsg = {
      success: true
    }
    return returnMsg;
  }

}
