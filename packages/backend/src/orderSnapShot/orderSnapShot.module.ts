import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderSnapShot } from "./entities/orderSnapShot.entity";
import { OrderSnapShotService } from "./orderSnapShot.service";

@Module({
  imports: [TypeOrmModule.forFeature([OrderSnapShot])],
  providers: [OrderSnapShotService],
  exports: [OrderSnapShotService],
})
export class OrderSnapShotModule {}
