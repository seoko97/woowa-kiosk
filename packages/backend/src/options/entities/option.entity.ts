import { Menu } from "@menus/entities/menu.entity";
import { OptionDetail } from "@optionDetails/entities/optionDetail.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "option_table" })
@Unique(["name"])
export class Option extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 30 })
  name!: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  @OneToMany(() => OptionDetail, (detail) => detail.option)
  details!: OptionDetail[];

  @ManyToMany(() => Menu, (menu) => menu.options)
  menus: Menu[];
}

export type OptionRepository = Repository<Option>;
