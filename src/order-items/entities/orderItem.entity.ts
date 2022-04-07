import { Order } from "src/orders/entities/order.entity";
import { Schedule } from "src/schedules/entities/schedule.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qty: number;

  @Column({ type: 'double' })
  price: number;

  @Column({ type: 'double' })
  sub_total_price: number;

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

  @ManyToOne(() => Order, order => order.id)
  order_id: Order;

  @ManyToOne(() => Schedule, schedule => schedule.id)
  movie_schedule_id: Schedule;

}