import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "@orders/orders.service";
import { OrdersController } from "@orders/orders.controller";
import { OrderDetailsModule } from "@orderDetails/orderDetails.module";
import { Order } from "./entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderDetailsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
