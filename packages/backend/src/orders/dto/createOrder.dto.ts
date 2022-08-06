import { PickType } from "@nestjs/mapped-types";
import { CreateOrderDetailDto } from "@orderDetails/dto/createOrderDetail.dto";
import { Order } from "@orders/entities/order.entity";
import { IsArray } from "class-validator";

export class CreateOrderDto extends PickType(Order, [
  "date",
  "payment",
  "totalPrice",
  "inputPrice",
]) {
  @IsArray()
  orderDetails: CreateOrderDetailDto[];
}
