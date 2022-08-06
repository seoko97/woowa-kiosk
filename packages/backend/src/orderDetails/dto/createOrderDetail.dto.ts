import { PickType } from "@nestjs/mapped-types";
import { OrderDetail } from "@orderDetails/entities/orderDetail.entity";
import { IsString } from "class-validator";

export class CreateOrderDetailDto extends PickType(OrderDetail, [
  "count",
  "totalPrice",
  "options",
  "menuId",
]) {
  @IsString({ always: false })
  date?: string;
}
