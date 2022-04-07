import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { MoviesModule } from 'src/movies/movies.module';
import { StudiosModule } from 'src/studios/studios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), MoviesModule, StudiosModule],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService]
})
export class SchedulesModule {}
