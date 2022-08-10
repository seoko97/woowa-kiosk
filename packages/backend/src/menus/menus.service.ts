import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getDateByNow } from "@utils/getDateByNow";
import { FindOneOptions } from "typeorm";
import { CreateMenuDto } from "./dto/createMenu.dto";
import { UpdateMenuDto } from "./dto/updateMenu.dto";
import { Menu, MenuRepository } from "./entities/menu.entity";

@Injectable()
export class MenusService {
  constructor(@InjectRepository(Menu) private readonly menuRepository: MenuRepository) {}

  async create(createMenuDto: CreateMenuDto) {
    const { name } = createMenuDto;
    try {
      const isAlready = await this.menuRepository.findOneBy({ name });

      if (isAlready) throw new Error("이미 존재하는 메뉴입니다.");

      const menu = await this.menuRepository.create(createMenuDto).save();

      return { ok: true, menu };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async findAll() {
    const menuRepository = await this.menuRepository.createQueryBuilder("menu");
    const date = getDateByNow();

    return await menuRepository
      .select([
        "menu.id as id",
        "menu.name as name",
        "menu.imgUrl as imgUrl",
        "menu.price as price",
        "category.name as categoryName",
        "ifnull(saleByDate.count, 0) as sellCount",
        "menu.createdAt as createdAt",
        "menu.updatedAt as updatedAt",
      ])
      .leftJoin("menu.saleByDate", "saleByDate", "saleByDate.date = :date", { date })
      .leftJoin("menu.category", "category", "category.id = menu.categoryId")
      .groupBy("menu.id, saleByDate.count")
      .orderBy("sellCount", "DESC")
      .execute();
  }

  async findOne(id: number) {
    return this.menuRepository.findOne({
      where: { id },
      relations: {
        category: true,
        options: {
          details: true,
        },
      },
    });
  }

  findOneById(id: number, options: FindOneOptions<Menu> = {}) {
    return this.menuRepository.findOne({ where: { id }, ...options });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.menuRepository.update(id, updateMenuDto);
  }

  delete(id: number) {
    return this.menuRepository.delete(id);
  }
}
