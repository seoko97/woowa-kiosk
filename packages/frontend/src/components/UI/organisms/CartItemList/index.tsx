import styled from "@emotion/styled";
import { memo, useRef } from "react";
import { useCart, useCartAction } from "src/contexts/CartContext";
import useScrollXTouchSlide from "src/hooks/useScrollXTouchSlide";
import CartItem from "../../molecules/CartItem";

const CartItemList = () => {
  const ref = useRef(null);
  const cartItems = useCart();
  const { deleteCartItem } = useCartAction();

  useScrollXTouchSlide(ref);

  return (
    <Container ref={ref}>
      {cartItems.length === 0 && <p className="none">메뉴를 선택해 주세요!</p>}
      {cartItems.map((item, i) => (
        <CartItem key={item.menuName + i} item={item} deleteItem={deleteCartItem} />
      ))}
    </Container>
  );
};

const Container = styled.section`
  flex: 2;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow-x: scroll;
  flex-wrap: nowrap;
  gap: 1.2rem;
  padding: 1rem 0;
  min-height: 150px;

  & > .none {
    width: 100%;
    text-align: center;
    font-size: 2rem;
    color: ${({ theme }) => theme.LABEL};
  }
`;

export default CartItemList;
