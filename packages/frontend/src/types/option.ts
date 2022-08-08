import { CoreDataDto } from "./core";

interface IOption extends CoreDataDto {
  id: number;
  name: string;
  details: IOptionDetail[];
}

interface IOptionDetail extends CoreDataDto {
  name: string;
  price: number;
}

export type { IOption, IOptionDetail };
