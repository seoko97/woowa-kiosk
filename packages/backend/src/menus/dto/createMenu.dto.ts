import { Menu } from "@menus/entities/menu.entity";
import { PickType } from "@nestjs/mapped-types";

export class CreateMenuDto extends PickType(Menu, [
  "name",
  "imgUrl",
  "price",
  "category",
] as const) {}
