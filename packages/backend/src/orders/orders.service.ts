import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { OrderDetailsService } from "@orderDetails/orderDetails.service";
import { DataSource } from "typeorm";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { Order, OrderRepository } from "./entities/order.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: OrderRepository,
    private readonly orderDetailService: OrderDetailsService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { date, payment, totalPrice, inputPrice, orderDetails } = createOrderDto;

    try {
      const recentOrder = await this.orderRepository.find({
        where: { date },
        order: { orderNumber: "desc" },
        take: 1,
      });

      const orderNumber = recentOrder[0] ? recentOrder[0].orderNumber + 1 : 1;

      const order = await this.orderRepository.create({
        date,
        payment,
        totalPrice,
        orderNumber,
        inputPrice: inputPrice ?? totalPrice,
      });

      const createdOrderDetails = await this.orderDetailService.createMany(date, orderDetails);

      order.orderDetails = createdOrderDetails;

      await order.save();

      return { ok: true, order };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  findAll() {
    return this.orderRepository.find({});
  }

  findOne(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          menu: true,
          options: true,
        },
      },
      withDeleted: true,
    });
  }
}
