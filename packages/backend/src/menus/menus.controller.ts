import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { MenusService } from "./menus.service";
import { CreateMenuDto } from "./dto/createMenu.dto";
import { UpdateMenuDto } from "./dto/updateMenu.dto";

@Controller("menu")
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    const result = await this.menusService.create(createMenuDto);

    return result;
  }

  @Get()
  async findAll() {
    const menus = await this.menusService.findAll();

    return { ok: true, menus };
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const menu = await this.menusService.findOne(id);

    return { ok: true, menu };
  }

  @Patch(":id")
  async update(@Param("id") id: number, @Body() updateMenuDto: UpdateMenuDto) {
    await this.menusService.update(id, updateMenuDto);

    const menu = await this.menusService.findOne(id);

    return { ok: true, menu };
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    await this.menusService.delete(id);

    return { ok: true };
  }
}
