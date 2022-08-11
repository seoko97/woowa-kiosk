import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenusModule } from "@menus/menus.module";
import { OptionDetailsModule } from "@optionDetails/optionDetails.module";
import { OptionsService } from "./options.service";
import { OptionsController } from "./options.controller";
import { Option } from "./entities/option.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Option]), MenusModule, OptionDetailsModule],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
