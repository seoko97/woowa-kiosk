import { ICategory } from "./category";
import { CoreDataDto, CoreRes } from "./core";
import { IOption } from "./option";

interface IMenu {
  name: string;
  imgUrl: string;
  price: number;
  category: ICategory;
  sellCount: string;
  options: IOption[];
}

type IMenuRes = Omit<IMenu & CoreDataDto, "sellCount">;
type IMenusRes = Omit<IMenu & CoreDataDto, "options" | "category">;

interface IRequestGetMenus extends CoreRes {
  menus: IMenusRes[];
}

interface IRequestGetMenu extends CoreRes {
  menu: IMenuRes;
}

export type { IMenu, IMenuRes, IRequestGetMenu, IRequestGetMenus, IMenusRes };
