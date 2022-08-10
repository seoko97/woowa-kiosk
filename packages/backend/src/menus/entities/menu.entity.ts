import { IsArray, IsNumber, IsString } from "class-validator";
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Repository,
  Unique,
} from "typeorm";
import { Category } from "@categories/entities/category.entity";
import { Option } from "@options/entities/option.entity";
import { CustomBaseEntity } from "@src/core/CustomBaseEntity";
import { SaleByDate } from "@orderDetails/entities/saleByDate.entity";

@Entity({ name: "menu_table" })
@Unique(["name"])
export class Menu extends CustomBaseEntity {
  @Column({ type: "varchar", length: 30 })
  @IsString()
  name!: string;

  @Column({ type: "text" })
  @IsString()
  imgUrl!: string;

  @Column({ type: "int" })
  @IsNumber()
  price!: number;

  @Column({ type: "int", select: false })
  @IsNumber()
  categoryId!: number;

  @ManyToOne(() => Category, (category) => category.menus)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @OneToMany(() => Option, (option) => option.menu)
  @IsArray()
  options!: Option[];

  @OneToMany(() => SaleByDate, (saleByDate) => saleByDate.menu)
  saleByDate!: SaleByDate[];

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;
}

export type MenuRepository = Repository<Menu>;
