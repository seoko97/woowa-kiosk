import { IRequestGetMenu, IRequestGetMenus } from "src/types/menu";
import axios from ".";

const requestGetMenusByCategoryId = async (categoryId: number) => {
  const { data } = await axios.get<IRequestGetMenus>(`/menu?categoryId=${categoryId}`);

  return data.menus;
};

const requestGetMenuById = async (id: number) => {
  const { data } = await axios.get<IRequestGetMenu>(`/menu/${id}`);

  return data.menu;
};

export { requestGetMenuById, requestGetMenusByCategoryId };
