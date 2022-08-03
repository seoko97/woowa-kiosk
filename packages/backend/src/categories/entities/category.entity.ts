import { Menu } from "@menus/entities/menu.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "category_table" })
@Unique(["name"])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 30 })
  name!: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  @OneToMany(() => Menu, (menu) => menu.category)
  menus!: Menu[];
}

export type CategoryRepository = Repository<Category>;
