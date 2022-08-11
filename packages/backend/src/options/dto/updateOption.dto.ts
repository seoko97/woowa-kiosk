import { PartialType } from "@nestjs/mapped-types";
import { CreateOptionDto } from "./createOption.dto";

export class UpdateOptionDto extends PartialType(CreateOptionDto) {}
