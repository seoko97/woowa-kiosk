import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getDateByNow } from "@utils/getDateByNow";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";
import { Category, CategoryRepository } from "./entities/category.entity";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryRepository.create(createCategoryDto);

    await this.categoryRepository.save(newCategory);

    return newCategory;
  }

  async findAll() {
    const categoryRepository = await this.categoryRepository.createQueryBuilder("category");
    const date = getDateByNow();

    return await categoryRepository
      .leftJoinAndMapMany("category.menus", "category.menus", "menu")
      .leftJoinAndMapOne(
        "menu.saleByDate",
        "menu.saleByDate",
        "saleByDate",
        "saleByDate.date = :date",
        { date },
      )
      .orderBy("saleByDate.count", "DESC")
      .select(["category", "menu", "saleByDate"])
      .getMany();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id }, relations: ["menus"] });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  delete(id: number) {
    return this.categoryRepository.delete(id);
  }
}
