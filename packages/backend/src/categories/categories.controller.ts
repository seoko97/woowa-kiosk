import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";

@Controller("category")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.create(createCategoryDto);

    return { ok: true, category };
  }

  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();

    return { ok: true, categories };
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.categoriesService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    await this.categoriesService.update(id, updateCategoryDto);

    const category = await this.categoriesService.findOne(id);

    return { ok: true, category };
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.categoriesService.delete(id);
  }
}
