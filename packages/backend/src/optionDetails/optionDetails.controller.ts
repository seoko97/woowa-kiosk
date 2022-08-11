import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { OptionDetailsService } from "./optionDetails.service";
import { CreateOptionDetailDto } from "./dto/createOptionDetail.dto";
import { UpdateOptionDetailDto } from "./dto/updateOptionDetail.dto";

@Controller("option-details")
export class OptionDetailsController {
  constructor(private readonly optionDetailsService: OptionDetailsService) {}

  @Post()
  async create(@Body() createOptionDetailDto: CreateOptionDetailDto) {
    const optionDetail = await this.optionDetailsService.create(createOptionDetailDto);

    return { ok: true, optionDetail };
  }

  @Get()
  findAll() {
    return this.optionDetailsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.optionDetailsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateOptionDetailDto: UpdateOptionDetailDto) {
    return this.optionDetailsService.update(id, updateOptionDetailDto);
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.optionDetailsService.delete(id);
  }
}
