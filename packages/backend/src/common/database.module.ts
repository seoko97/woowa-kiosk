import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { config } from "dotenv";

config();

const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["dist/**/**/*.entity{.ts,.js}"],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG)],
})
export class DatabaseModule {}
