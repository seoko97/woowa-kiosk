import { Option } from "@options/entities/option.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "option_detail_table" })
export class OptionDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50 })
  detail!: string;

  @Column({ type: "int" })
  price!: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  @ManyToOne(() => Option, (option) => option.details)
  option!: Option;
}

export type OptionDetailsRepository = Repository<OptionDetail>;
