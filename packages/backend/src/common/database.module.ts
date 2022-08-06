import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { Category } from "@categories/entities/category.entity";
import { Menu } from "@menus/entities/menu.entity";
import { OptionDetail } from "@optionDetails/entities/optionDetail.entity";
import { Option } from "@options/entities/option.entity";

import { config } from "dotenv";
import { CommonModule } from "./common.module";
import { Order } from "@orders/entities/order.entity";
import { OrderDetail } from "@orderDetails/entities/orderDetail.entity";
import { OrderSnapShot } from "@src/orderSnapShot/entities/orderSnapShot.entity";
import { SaleByDate } from "@orderDetails/entities/saleByDate.entity";

config();

const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Category, Menu, Option, OptionDetail, Order, OrderDetail, OrderSnapShot, SaleByDate],
  synchronize: true,
  logging: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG), CommonModule],
})
export class DatabaseModule {}
