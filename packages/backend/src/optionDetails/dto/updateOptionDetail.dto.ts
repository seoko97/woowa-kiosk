import { PartialType } from "@nestjs/mapped-types";
import { CreateOptionDetailDto } from "./createOptionDetail.dto";

export class UpdateOptionDetailDto extends PartialType(CreateOptionDetailDto) {}
