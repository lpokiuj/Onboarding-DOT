import { Movie } from "src/movies/entities/movie.entity";
import { Studio } from "src/studios/entities/studio.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column({ type: 'double' })
  price: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @ManyToOne(() => Movie, movie => movie.id)
  movie_id: Movie;

  @ManyToOne(() => Studio, studio => studio.id)
  studio_id: Studio;
}