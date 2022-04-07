import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/orderItem.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { SchedulesModule } from 'src/schedules/schedules.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem]), OrdersModule, SchedulesModule],
  controllers: [OrderItemsController],
  providers: [OrderItemsService]
})
export class OrderItemsModule {}
