import { CoreDataDto, CoreRes } from "./core";

interface ICategory {
  id: number;
  name: string;
}

type ICategoryRes = ICategory & CoreDataDto;

interface IGetCategories extends CoreRes {
  categories: ICategoryRes[];
}

export type { ICategory, ICategoryRes, IGetCategories };
