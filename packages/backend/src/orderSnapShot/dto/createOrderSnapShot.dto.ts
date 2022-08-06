import { PickType } from "@nestjs/mapped-types";
import { OrderSnapShot } from "../entities/orderSnapShot.entity";

export class CreateOrderSnapshot extends PickType(OrderSnapShot, [
  "optionName",
  "optionDetailName",
  "optionDetailPrice",
]) {}
