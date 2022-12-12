import styled from "@emotion/styled";
import { memo } from "react";
import CartSideBar from "../../molecules/CartSideBar";
import RowFrame from "../../template/RowFrame";
import CartItemList from "../CartItemList";

const Cart = () => {
  return (
    <Container>
      <CartItemList />
      <CartSideBar />
    </Container>
  );
};

const Container = styled(RowFrame)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${({ theme }) => theme.OFF_WHITE};

  margin-top: auto;
`;

export default memo(Cart);
