import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto : CreateOrderDto){
    return this.ordersService.create(createOrderDto);
  }
  
  @Get()
  getAllOrder(){
    return this.ordersService.getAll();
  }

  @Get(':id')
  getByID(@Param('id') id: string){
    return this.ordersService.getByID(id);
  }
}
