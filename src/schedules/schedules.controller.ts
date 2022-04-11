import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @UseGuards(AdminGuard)
  @Post()
  addSchedule(@Body() createScheduleDto : CreateScheduleDto){
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  getAllSchedule(){
    return this.schedulesService.getAll();
  }

  @Get(':id')
  getScheduleByID(@Param('id') id: string){
    return this.schedulesService.getByID(id);
  }
}
