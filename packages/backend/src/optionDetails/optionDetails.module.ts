import { Module } from "@nestjs/common";
import { OptionDetailsService } from "./optionDetails.service";
import { OptionDetailsController } from "./optionDetails.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OptionDetail } from "./entities/optionDetail.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OptionDetail])],
  controllers: [OptionDetailsController],
  providers: [OptionDetailsService],
})
export class OptionDetailsModule {}
