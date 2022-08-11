import { IsNumber, IsString } from "class-validator";
import { CustomBaseEntity } from "@src/core/CustomBaseEntity";
import { Column, Entity, ManyToOne, Repository } from "typeorm";
import { OrderDetail } from "@orderDetails/entities/orderDetail.entity";

@Entity({ name: "order_snapshot_table" })
export class OrderSnapShot extends CustomBaseEntity {
  @Column({ type: "varchar" })
  @IsString()
  optionName!: string;

  @Column({ type: "varchar" })
  @IsString()
  optionDetailName!: string;

  @Column({ type: "int" })
  @IsNumber()
  optionDetailPrice!: number;

  @ManyToOne(() => OrderDetail)
  orderDetail!: OrderDetail;
}

export type OrderSnapShotRepository = Repository<OrderSnapShot>;
