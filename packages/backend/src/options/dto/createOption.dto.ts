import { PickType } from "@nestjs/mapped-types";
import { Option } from "@options/entities/option.entity";
import { IsNumber } from "class-validator";

export class CreateOptionDto extends PickType(Option, ["name", "isDuplicate", "details"]) {
  @IsNumber()
  menuId: number;
}
