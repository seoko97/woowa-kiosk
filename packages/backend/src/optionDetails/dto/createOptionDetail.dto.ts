import { PickType } from "@nestjs/mapped-types";
import { OptionDetail } from "@optionDetails/entities/optionDetail.entity";

export class CreateOptionDetailDto extends PickType(OptionDetail, ["name", "price"]) {}
