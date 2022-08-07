import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { UpdateOrderDto } from "./dto/updateOrder.dto";

@Controller("order")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const result = await this.ordersService.create(createOrderDto);

    return result;
  }

  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll();

    return orders;
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const order = await this.ordersService.findOne(id);

    return { ok: true, order };
  }
}
