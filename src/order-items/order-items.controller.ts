import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/orderItem-create.dto';
import { OrderItemsService } from './order-items.service';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  createOrderItem(@Body() createOrderItemDto : CreateOrderItemDto){
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  getAllOrderItem(){
    return this.orderItemsService.getAll();
  }

  @Get(':id')
  getOrderItemByID(@Param('id') id: string){
    return this.orderItemsService.getByID(id);
  }
}
