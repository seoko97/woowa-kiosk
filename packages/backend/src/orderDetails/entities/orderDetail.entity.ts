import { Menu } from "@menus/entities/menu.entity";
import {} from "@optionDetails/entities/optionDetail.entity";
import { Order } from "@orders/entities/order.entity";
import { CustomBaseEntity } from "@src/core/CustomBaseEntity";
import { IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Repository } from "typeorm";
import { OrderSnapShot } from "../../orderSnapShot/entities/orderSnapShot.entity";

@Entity({ name: "order_detail_table" })
export class OrderDetail extends CustomBaseEntity {
  @Column({ type: "int" })
  @IsNumber()
  count!: number;

  @Column({ type: "int" })
  @IsNumber()
  totalPrice!: number;

  @Column({ type: "varchar" })
  @IsString()
  date!: string;

  @Column({ type: "int", select: false })
  @IsNumber()
  menuId!: number;

  @ManyToOne(() => Menu, (menu) => menu.orders)
  @JoinColumn({ name: "menuId" })
  menu!: Menu;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order!: Order;

  @OneToMany(() => OrderSnapShot, (snapShot) => snapShot.orderDetail)
  options: OrderSnapShot[];
}

export type OrderDetailRepository = Repository<OrderDetail>;
