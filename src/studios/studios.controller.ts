import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateStudioDto } from './dto/create-studio.dto';
import { StudiosService } from './studios.service';

@Controller('studios')
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Post()
  createStudio(@Body() createStudioDto: CreateStudioDto){
    return this.studiosService.create(createStudioDto);
  }

  @Get()
  getAllStudio(){
    return this.studiosService.getAll();
  }

  @Get(':id')
  getStudioByID(@Param('id') id: string){
    return this.studiosService.getByID(id);
  }

  @Delete(':id')
  deleteStudio(@Param('id') id: string){
    return this.studiosService.delete(id);
  }
}

