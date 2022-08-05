import { Category } from "@categories/entities/category.entity";
import { Option } from "@options/entities/option.entity";
import { CustomBaseEntity } from "@src/core/CustomBaseEntity";
import { IsArray, IsInt, IsObject, IsString } from "class-validator";
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Repository,
  Unique,
} from "typeorm";

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
  @IsInt()
  price!: number;

  @Column({ type: "int", default: 0 })
  sellCount!: number;

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;

  @ManyToOne(() => Category, (category) => category.menus)
  @IsObject()
  category: Category;

  @ManyToMany(() => Option, (option) => option.menus)
  @JoinTable({
    name: "menu_option",
    joinColumn: {
      name: "menuId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "optionId",
      referencedColumnName: "id",
    },
  })
  @IsArray()
  options!: Option[];
}

export type MenuRepository = Repository<Menu>;
