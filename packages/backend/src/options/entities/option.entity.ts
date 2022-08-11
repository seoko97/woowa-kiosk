import { Menu } from "@menus/entities/menu.entity";
import { OptionDetail } from "@optionDetails/entities/optionDetail.entity";
import { CustomBaseEntity } from "@src/core/CustomBaseEntity";
import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Repository } from "typeorm";

@Entity({ name: "option_table" })
export class Option extends CustomBaseEntity {
  @Column({ type: "varchar", length: 30 })
  @IsString()
  name!: string;

  @Column({ type: "boolean" })
  @IsBoolean()
  isDuplicate!: boolean;

  @Column({ type: "int", select: false })
  @IsNumber()
  menuId!: number;

  @ManyToOne(() => Menu, (menu) => menu.options)
  @JoinColumn({ name: "menuId" })
  menu: Menu;

  @OneToMany(() => OptionDetail, (detail) => detail.option)
  @IsArray()
  details!: OptionDetail[];
}

export type OptionRepository = Repository<Option>;
