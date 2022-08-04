import { Menu } from "@menus/entities/menu.entity";
import { CustomBaseEntity } from "@src/core/CustomBaseEntity";
import { IsString } from "class-validator";
import { Column, Entity, OneToMany, Repository, Unique } from "typeorm";

@Entity({ name: "category_table" })
@Unique(["name"])
export class Category extends CustomBaseEntity {
  @Column({ type: "varchar", length: 30 })
  @IsString()
  name!: string;

  @OneToMany(() => Menu, (menu) => menu.category, { onDelete: "CASCADE" })
  menus!: Menu[];
}

export type CategoryRepository = Repository<Category>;
