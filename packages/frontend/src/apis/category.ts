import { IGetCategories } from "src/types/category";
import axios from ".";

const requestGetCategories = async () => {
  const { data } = await axios.get<IGetCategories>("/category");

  return data.categories;
};

export { requestGetCategories };
