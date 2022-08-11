import { IsNumber, IsString } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, Repository } from "typeorm";
import { Order } from "@orders/entities/order.entity";
import { OrderSnapShot } from "@orderSnapShot/entities/orderSnapShot.entity";
import { CustomBaseEntity } from "@src/core/CustomBaseEntity";

@Entity({ name: "order_detail_table" })
export class OrderDetail extends CustomBaseEntity {
  @Column({ type: "int" })
  @IsNumber()
  count!: number;

  @Column({ type: "varchar" })
  @IsString()
  date!: string;

  @Column({ type: "varchar" })
  @IsString()
  menuName!: string;

  @Column({ type: "int" })
  @IsNumber()
  menuPrice!: number;

  @Column({ type: "text" })
  @IsString()
  menuImgUrl!: string;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order!: Order;

  @OneToMany(() => OrderSnapShot, (snapShot) => snapShot.orderDetail)
  options: OrderSnapShot[];
}

export type OrderDetailRepository = Repository<OrderDetail>;
