import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository : Repository<Order>,

    private userService : UsersService
  ){}

  async create(createOrderDto : CreateOrderDto){
    const {user_id, ...orderDto} = createOrderDto
    // Check user
    const user = await this.userService.getByID(user_id);
    if(!user){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User not found'
      }, HttpStatus.NOT_FOUND);
    }

    const order = this.orderRepository.create(orderDto);
    order.user_id = user

    const savedOrder = await this.orderRepository.save(order);
    const returnMsg = {
      success: true,
      order: savedOrder
    }

    return returnMsg;
  }

  getAll(){
    return this.orderRepository.find();
  }

  async getByID(id: string | number){
    if(typeof id === 'number'){
      const order = await this.orderRepository.findOne(id);
      return order;
    }

    const order = await this.orderRepository.findOne(id);
    if(!order){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Order not found'
      }, HttpStatus.NOT_FOUND);
    }

    return order;
  }
}
