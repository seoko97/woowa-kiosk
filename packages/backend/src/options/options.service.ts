import { DataSource } from "typeorm";
import { MenusService } from "@menus/menus.service";
import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { OptionDetailsService } from "@optionDetails/optionDetails.service";
import { CreateOptionDto } from "./dto/createOption.dto";
import { UpdateOptionDto } from "./dto/updateOption.dto";
import { Option, OptionRepository } from "./entities/option.entity";

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option) private readonly optionRepository: OptionRepository,
    @InjectDataSource() private dataSource: DataSource,
    private readonly menusService: MenusService,
    private readonly optionDetailsService: OptionDetailsService,
  ) {}

  async create(createOptionDto: CreateOptionDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const optionRepository = await queryRunner.manager.getRepository(Option);

    try {
      const { details, ...info } = createOptionDto;

      const selectedMenu = await this.menusService.findOneById(info.menuId, {
        relations: ["options"],
      });

      const isAlready = selectedMenu.options.some((op) => op.name === info.name);

      if (isAlready) throw Error("이미 존재하는 옵션입니다.");

      const option = await optionRepository.create(info);
      const createdDetails = await this.optionDetailsService.createAll(details);

      option.details = createdDetails;

      await option.save();
      await queryRunner.commitTransaction();

      return { ok: true, option };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { ok: false, error: error.message };
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.optionRepository.find();
  }

  findOne(id: number) {
    return this.optionRepository.findOne({ where: { id } });
  }

  update(id: number, updateOptionDto: UpdateOptionDto) {
    return this.optionRepository.update(id, updateOptionDto);
  }

  delete(id: number) {
    return this.optionRepository.delete(id);
  }
}
