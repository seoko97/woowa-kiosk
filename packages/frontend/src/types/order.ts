import { CoreDataDto, CoreRes } from "./core";

interface IOrder {
  date: string;
  payment: string;
  inputPrice: number;
  totalPrice: number;
  orderDetails: IOrderDetail[];
}

interface IOrderDetail {
  count: number;
  menuName: string;
  menuPrice: number;
  menuImgUrl: string;
  options: IOrderOptionSnapShot[];
}

interface IOrderOptionSnapShot {
  optionName: string;
  optionDetailName: string;
  optionDetailPrice: number;
}

interface IOrderDetailRes extends IOrderDetail, CoreDataDto {
  date: string;
  options: (IOrderOptionSnapShot & CoreDataDto)[];
}

interface IOrderRes extends IOrder, CoreDataDto {
  orderNumber: number;
  orderDetails: IOrderDetailRes[];
}

interface IRequestCreateOrder extends CoreRes {
  order: IOrderRes;
}

interface ICreateOrderDto extends Omit<IOrder, "orderDetails"> {
  orderDetails: IOrder;
}

export type {
  IOrder,
  IOrderDetail,
  IOrderOptionSnapShot,
  IOrderRes,
  IRequestCreateOrder,
  ICreateOrderDto,
};
