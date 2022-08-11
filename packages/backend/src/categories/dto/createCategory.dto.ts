import { Category } from "@categories/entities/category.entity";
import { PickType } from "@nestjs/mapped-types";

export class CreateCategoryDto extends PickType(Category, ["name"]) {}
