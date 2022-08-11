import { Menu } from "@menus/entities/menu.entity";
import { PartialType, PickType } from "@nestjs/mapped-types";
import { CreateMenuDto } from "./createMenu.dto";

class IUpdateMenu extends (PickType(Menu, ["options"]), CreateMenuDto) {}

export class UpdateMenuDto extends PartialType(IUpdateMenu) {}
