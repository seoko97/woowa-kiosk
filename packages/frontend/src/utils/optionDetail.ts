import { IOption } from "src/types/option";
import { IOrderOptionSnapShot } from "src/types/order";

export const getOptionDetail = (options: IOption[]): IOrderOptionSnapShot[] => {
  const optionSnapshot = options.map(({ details, name }) => {
    const defaultDetail = details[0];

    return {
      optionName: name,
      optionDetailName: defaultDetail.name,
      optionDetailPrice: defaultDetail.price,
    };
  });

  return optionSnapshot;
};
