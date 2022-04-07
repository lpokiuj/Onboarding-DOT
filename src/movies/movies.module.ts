import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), TagsModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService]
})
export class MoviesModule {}
