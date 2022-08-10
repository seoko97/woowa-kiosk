import { IRequestGetMenu, IRequestGetMenus } from "src/types/menu";
import axios from ".";

const requestGetMenus = async () => {
  const { data } = await axios.get<IRequestGetMenus>(`/menu`);

  return data.menus;
};

const requestGetMenuById = async (id: number) => {
  const { data } = await axios.get<IRequestGetMenu>(`/menu/${id}`);

  return data.menu;
};

export { requestGetMenuById, requestGetMenus };
