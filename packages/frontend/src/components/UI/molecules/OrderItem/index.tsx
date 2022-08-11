import styled from "@emotion/styled";
import { IOrderDetail } from "src/types/order";
import Image from "../../atoms/Image";
import OrderItemInfo from "./OrderItemInfo";

interface Props {
  menu: IOrderDetail;
}

const OrderItem = ({ menu }: Props) => {
  const { menuImgUrl } = menu;

  return (
    <Container>
      <Image width="200px" src={menuImgUrl} />
      <OrderItemInfo menu={menu} />
    </Container>
  );
};

const Container = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export default OrderItem;
