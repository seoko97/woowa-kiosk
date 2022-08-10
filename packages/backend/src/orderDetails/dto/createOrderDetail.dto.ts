import { PickType } from "@nestjs/mapped-types";
import { OrderDetail } from "@orderDetails/entities/orderDetail.entity";
import { SaleByDate } from "@orderDetails/entities/saleByDate.entity";
import { IsString } from "class-validator";

export class CreateOrderDetailDto extends PickType(OrderDetail, [
  "count",
  "options",
  "menuName",
  "menuPrice",
]) {
  @IsString({ always: false })
  date?: string;
}

export class SaleByDateDto extends PickType(SaleByDate, ["count", "date", "menuName"]) {}
