import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { OptionsService } from "./options.service";
import { CreateOptionDto } from "./dto/createOption.dto";
import { UpdateOptionDto } from "./dto/updateOption.dto";

@Controller("option")
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  async create(@Body() createOptionDto: CreateOptionDto) {
    const result = await this.optionsService.create(createOptionDto);

    return result;
  }

  @Get()
  async findAll() {
    const options = await this.optionsService.findAll();
    return { ok: true, options };
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const option = this.optionsService.findOne(id);
    return { ok: true, option };
  }

  @Patch(":id")
  async update(@Param("id") id: number, @Body() updateOptionDto: UpdateOptionDto) {
    await this.optionsService.update(id, updateOptionDto);

    const option = await this.optionsService.findOne(id);

    return { ok: true, option };
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    await this.optionsService.delete(id);

    return { ok: true };
  }
}
