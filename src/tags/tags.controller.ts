import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  addTag(@Body() createTagDto : CreateTagDto){
    return this.tagsService.create(createTagDto);
  }

  @Get()
  getTag(){
    return this.tagsService.getAll();
  }

  @Get(':id')
  getTagByID(@Param('id') id : string){
    return this.tagsService.getByID(id);
  }
}
