import { CoreDataDto, CoreRes } from "./core";
import { IMenusRes } from "./menu";

interface ICategory {
  id: number;
  name: string;
}

interface ICategoryRes extends ICategory, CoreDataDto {
  menus: IMenusRes[];
}

interface IGetCategories extends CoreRes {
  categories: ICategoryRes[];
}

export type { ICategory, ICategoryRes, IGetCategories };
