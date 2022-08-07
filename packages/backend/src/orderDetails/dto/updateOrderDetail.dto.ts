import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderDetailDto } from "./createOrderDetail.dto";

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {}
