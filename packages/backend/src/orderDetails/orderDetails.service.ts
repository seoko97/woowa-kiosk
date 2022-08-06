import { SaleByDate, SaleByDateRepository } from "@orderDetails/entities/saleByDate.entity";
import { MenusService } from "@menus/menus.service";
import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { OrderSnapShotService } from "@src/orderSnapShot/orderSnapShot.service";
import { DataSource } from "typeorm";
import { CreateOrderDetailDto } from "./dto/createOrderDetail.dto";
import { OrderDetail, OrderDetailRepository } from "./entities/orderDetail.entity";

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: OrderDetailRepository,

    @InjectRepository(SaleByDate)
    private readonly saleByDateRepository: SaleByDateRepository,

    private readonly orderSnapshotService: OrderSnapShotService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const { options, date, ...detail } = createOrderDetailDto;

    const orderDetail = await this.orderDetailRepository.create({
      date,
      ...detail,
    });

    const orderSnapShots = await this.orderSnapshotService.createMany(options);
    await this.upsertBySaleByDate({ date, menuId: detail.menuId, count: detail.count });

    orderDetail.options = orderSnapShots;

    await orderDetail.save();

    return orderDetail;
  }

  async createMany(date: string, oDetails: CreateOrderDetailDto[]) {
    return await Promise.all(oDetails.map((detail) => this.create({ ...detail, date })));
  }

  async upsertBySaleByDate(data) {
    const { menuId, date, count } = data;
    const item = await this.saleByDateRepository.findOneBy({ menuId, date });

    if (item) {
      item.count += count;
      await item.save();
      return item;
    }

    return await this.saleByDateRepository.create({ menuId, date, count }).save();
  }

  findAll() {
    return this.orderDetailRepository.find();
  }

  findOne(id: number) {
    return this.orderDetailRepository.findOne({
      where: { id },
      relations: {
        options: true,
      },
    });
  }
}
