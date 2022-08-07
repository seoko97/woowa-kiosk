import { OrderDetail } from "@orderDetails/entities/orderDetail.entity";
import { CustomBaseEntity } from "@src/core/CustomBaseEntity";
import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";
import { Column, Entity, OneToMany, Repository } from "typeorm";

enum PaymentMethod {
  CASH = "현금",
  CARD = "신용카드",
}

@Entity({ name: "order_table" })
export class Order extends CustomBaseEntity {
  @Column({ type: "varchar" })
  @IsString()
  date!: string;

  @Column({ type: "enum", enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  payment!: PaymentMethod;

  @Column({ type: "int" })
  @IsNumber()
  orderNumber!: number;

  @Column({ type: "int" })
  @IsNumber()
  inputPrice: number;

  @Column({ type: "int" })
  @IsNumber()
  totalPrice!: number;

  @OneToMany(() => OrderDetail, (detail) => detail.order)
  @IsArray()
  orderDetails!: OrderDetail[];
}

export type OrderRepository = Repository<Order>;
