import { ICategory } from "./category";
import { CoreDataDto, CoreRes } from "./core";
import { IOption } from "./option";

interface ISaleByDate extends CoreDataDto {
  date: string;
  count: number;
  menuName: string;
}

interface IMenu {
  name: string;
  imgUrl: string;
  price: number;
  categoryName: string;
  category: ICategory;
  options: IOption[];
  saleByDate: ISaleByDate;
}

interface IKeyInMenus {
  [key: string]: IMenusRes[];
}

type IMenuRes = Omit<IMenu & CoreDataDto, "sellCount" | "categoryName">;
type IMenusRes = Omit<IMenu & CoreDataDto, "options" | "category">;

interface IRequestGetMenus extends CoreRes {
  menus: IMenusRes[];
}

interface IRequestGetMenu extends CoreRes {
  menu: IMenuRes;
}

export type { IMenu, IMenuRes, IRequestGetMenu, IRequestGetMenus, IMenusRes, IKeyInMenus };
