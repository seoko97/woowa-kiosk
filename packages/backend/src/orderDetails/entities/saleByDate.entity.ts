import { Menu } from "@menus/entities/menu.entity";
import { CustomBaseEntity } from "@src/core/CustomBaseEntity";
import { IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Repository } from "typeorm";
import { OrderSnapShot } from "../../orderSnapShot/entities/orderSnapShot.entity";

@Entity({ name: "sale_by_date_table" })
export class SaleByDate extends CustomBaseEntity {
  @Column({ type: "varchar" })
  @IsString()
  date!: string;

  @Column({ type: "int" })
  @IsNumber()
  count!: number;

  @Column({ type: "int" })
  @IsNumber()
  menuId!: number;

  @ManyToOne(() => Menu, (menu) => menu.orders)
  @JoinColumn({ name: "menuId" })
  menu!: Menu;

  @OneToMany(() => OrderSnapShot, (snapShot) => snapShot.orderDetail)
  options: OrderSnapShot[];

  static upsertByDate(data: any) {
    console.log(data);
    return this.createQueryBuilder()
      .insert()
      .into(SaleByDate, ["date", "count", "menu"])
      .values(data)
      .orUpdate(["date", "menuId"], ["count"])
      .execute();
  }
}

export interface SaleByDateRepository extends Repository<SaleByDate> {
  upsertByDate: (data: any) => any;
}
