import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Studio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studio_number: number;

  @Column()
  seat_capacity: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

}