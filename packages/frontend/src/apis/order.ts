import { IOrder, IRequestCreateOrder } from "src/types/order";
import axios from ".";

const requestCreateOrder = async (body: IOrder) => {
  const { data } = await axios.post<IRequestCreateOrder>("/order", body);

  return data.order;
};

export { requestCreateOrder };
