import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
      const isAlready = await this.menuRepository.findOneBy({
        name,
      });

      if (isAlready) throw new Error("이미 존재하는 메뉴입니다.");

      const menu = await this.menuRepository.create(createMenuDto).save();

      return { ok: true, menu };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  findAll() {
    return this.menuRepository.find({
      relations: { category: true },
    });
  }

  findOne(id: number) {
    return this.menuRepository.findOne({
      where: { id },
      relations: {
        category: true,
        options: {
          details: true,
        },
        saleByDate: true,
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
    return this.menuRepository.softDelete(id);
  }
}
