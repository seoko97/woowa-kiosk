import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateOrderSnapshot } from "./dto/createOrderSnapShot.dto";
import { OrderSnapShot, OrderSnapShotRepository } from "./entities/orderSnapShot.entity";

@Injectable()
export class OrderSnapShotService {
  constructor(
    @InjectRepository(OrderSnapShot)
    private readonly orderSnapshot: OrderSnapShotRepository,
  ) {}

  create(createOrderSnapshot: CreateOrderSnapshot) {
    return this.orderSnapshot.create(createOrderSnapshot).save();
  }

  createMany(snapShots: CreateOrderSnapshot[]) {
    return Promise.all(snapShots.map((snapshot) => this.create(snapshot)));
  }
}
