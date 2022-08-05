import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { Category } from "@categories/entities/category.entity";
import { Menu } from "@menus/entities/menu.entity";
import { OptionDetail } from "@optionDetails/entities/optionDetail.entity";
import { Option } from "@options/entities/option.entity";

import { config } from "dotenv";
import { CommonModule } from "./common.module";

config();

const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Category, Menu, Option, OptionDetail],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG), CommonModule],
})
export class DatabaseModule {}
