import { Category } from "@categories/entities/category.entity";
import { Option } from "@options/entities/option.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "menu_table" })
@Unique(["name"])
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "text" })
  imgUrl: string;

  @Column({ type: "int" })
  price: number;

  @Column({ type: "int" })
  sellCount: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.menus)
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
  options: Option[];
}

export type MenuRepository = Repository<Menu>;
