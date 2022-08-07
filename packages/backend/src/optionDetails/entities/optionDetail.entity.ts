import { Option } from "@options/entities/option.entity";
import { CustomBaseEntity } from "@src/core/CustomBaseEntity";
import { IsInt, IsObject, IsString } from "class-validator";
import { Column, Entity, ManyToOne, Repository } from "typeorm";

@Entity({ name: "option_detail_table" })
export class OptionDetail extends CustomBaseEntity {
  @Column({ type: "varchar", length: 50 })
  @IsString()
  name!: string;

  @Column({ type: "int" })
  @IsInt()
  price!: number;

  @ManyToOne(() => Option, (option) => option.details)
  @IsObject()
  option!: Option;
}

export type OptionDetailsRepository = Repository<OptionDetail>;
