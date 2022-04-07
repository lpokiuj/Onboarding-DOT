import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { SchedulesService } from 'src/schedules/schedules.service';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/orderItem-create.dto';
import { OrderItem } from './entities/orderItem.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository : Repository<OrderItem>,

    private orderService : OrdersService,
    private scheduleService : SchedulesService
  ){}

  async create(createOrderItemDto : CreateOrderItemDto){
    
    const { order_id, movie_schedule_id, ...orderItemDto } = createOrderItemDto;
    // Check Order
    const order = await this.orderService.getByID(order_id);
    if(!order){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Order not found'
      }, HttpStatus.NOT_FOUND);
    }

    // Check Schedule
    const schedule = await this.scheduleService.getByID(movie_schedule_id);
    
    if(!schedule){
      console.log(schedule);
      
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Schedule not found'
      }, HttpStatus.NOT_FOUND);
    }

    const orderItem = this.orderItemRepository.create(orderItemDto);
    orderItem.order_id = order;
    orderItem.movie_schedule_id = schedule;

    const savedOrderItem = await this.orderItemRepository.save(orderItem);
    const returnMsg = {
      success: true,
      orderItem: savedOrderItem
    }

    return returnMsg;
  }

  getAll(){
    return this.orderItemRepository.find();
  }

  async getByID(id: string){
    const orderItem = await this.orderItemRepository.findOne(id);
    if(!orderItem){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Order Item not found'
      }, HttpStatus.NOT_FOUND);
    }

    return orderItem;
  }

}
