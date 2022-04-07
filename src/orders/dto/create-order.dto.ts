import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { PaymentMethod } from "../entities/order.entity";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsNotEmpty()
  @IsNumber()
  total_item_price: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}