import styled from "@emotion/styled";
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
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 20rem;
  border: 1px solid ${({ theme }) => theme.LINE};
  padding: 1rem;
  border-radius: 10px 10px 0 0;
  background-color: ${({ theme }) => theme.OFF_WHITE};

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    height: 17rem;
  }
`;

export default Cart;
