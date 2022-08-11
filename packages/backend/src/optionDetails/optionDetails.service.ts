import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateOptionDetailDto } from "./dto/createOptionDetail.dto";
import { UpdateOptionDetailDto } from "./dto/updateOptionDetail.dto";
import { OptionDetail, OptionDetailsRepository } from "./entities/optionDetail.entity";

@Injectable()
export class OptionDetailsService {
  constructor(
    @InjectRepository(OptionDetail)
    private readonly optionDetailRepository: OptionDetailsRepository,
  ) {}
  create(createOptionDetailDto: CreateOptionDetailDto) {
    return this.optionDetailRepository.create(createOptionDetailDto).save();
  }

  async createAll(details: CreateOptionDetailDto[]) {
    const createdDetails = await Promise.all(details.map((detail) => this.create(detail)));

    return createdDetails;
  }

  findAll() {
    return this.optionDetailRepository.find();
  }

  findOne(id: number) {
    return this.optionDetailRepository.findOne({ where: { id } });
  }

  update(id: number, updateOptionDetailDto: UpdateOptionDetailDto) {
    return this.optionDetailRepository.update(id, updateOptionDetailDto);
  }

  delete(id: number) {
    return this.optionDetailRepository.delete(id);
  }
}
