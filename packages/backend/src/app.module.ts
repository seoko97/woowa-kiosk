import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DatabaseModule } from "@common/database.module";
import { CategoriesModule } from "@categories/categories.module";
import { MenusModule } from "@menus/menus.module";
import { OptionsModule } from "@options/options.module";
import { OptionDetailsModule } from "@optionDetails/optionDetails.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    DatabaseModule,
    CategoriesModule,
    MenusModule,
    OptionsModule,
    OptionDetailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
