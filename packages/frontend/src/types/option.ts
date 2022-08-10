import { CoreDataDto } from "./core";

interface IOption extends CoreDataDto {
  id: number;
  name: string;
  details: IOptionDetail[];
  isDuplicate: boolean;
}

interface IOptionDetail extends CoreDataDto {
  name: string;
  price: number;
}

export type { IOption, IOptionDetail };
