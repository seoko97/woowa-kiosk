import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderSnapShotModule } from "@src/orderSnapShot/orderSnapShot.module";
import { OrderDetailsService } from "./orderDetails.service";
import { OrderDetail } from "./entities/orderDetail.entity";
import { SaleByDate } from "./entities/saleByDate.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, SaleByDate]), OrderSnapShotModule],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
