import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository : Repository<Tag>
  ){}

  async create(createTagDto : CreateTagDto){
    const tag = this.tagRepository.create(createTagDto);
    const savedTag = await this.tagRepository.save(tag);

    const returnMsg = {
      success: true,
      tag: savedTag
    }

    return returnMsg;
  }

  async getAll(){
    return await this.tagRepository.find();
  }

  async getByID(id: string){
    const tag = await this.tagRepository.findOne(id);
    if(!tag){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        msg: 'Tags not found'
      }, HttpStatus.NOT_FOUND) 
    }

    return tag;
  }

  async getByName(name: string){
    const tag = await this.tagRepository.findOne({ name });
    if(!tag){
      const tag = this.tagRepository.create({
        name: name
      });
      await this.tagRepository.save(tag);
      return tag;
    }

    return tag;
  }
}
