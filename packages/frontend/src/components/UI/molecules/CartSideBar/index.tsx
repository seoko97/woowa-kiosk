import styled from "@emotion/styled";
import { useEffect, useMemo } from "react";
import OrderModal from "src/components/modals/OrderModal";
import { useCart, useCartAction } from "src/contexts/CartContext";
import { useClearTimer } from "src/hooks/useClearTimer";
import useModal from "src/hooks/useModal";
import { getLocaleStringNumber } from "src/utils/getLocaleStringNumber";
import Button from "../../atoms/Button";

const CartSideBar = () => {
  const { clearCart } = useCartAction();
  const cartItems = useCart();
  const isDisabled = useMemo(() => cartItems.length === 0, [cartItems]);
  const [isOpenModal, openModal, closeModal] = useModal();

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const { count, menuPrice, options } = item;

      const optionTotalPrice = options.reduce(
        (sum, option) => (sum += option.optionDetailPrice),
        0,
      );
      acc += (menuPrice + optionTotalPrice) * count;

      return acc;
    }, 0);
  }, [cartItems]);

  const [, startTimer] = useClearTimer(() => {
    clearCart();
  }, 300000);

  useEffect(() => {
    if (cartItems.length === 0) return;
    startTimer();
  }, [cartItems, startTimer]);

  return (
    <>
      <Container>
        <section>
          <span>총 </span>
          <span>{getLocaleStringNumber(totalPrice)}원</span>
        </section>
        <Button size="md" bColor="ERROR" disabled={isDisabled} onClick={clearCart}>
          비우기
        </Button>
        <Button size="md" disabled={isDisabled} onClick={openModal}>
          결제
        </Button>
      </Container>
      {isOpenModal && <OrderModal onClose={closeModal} />}
    </>
  );
};

const Container = styled.aside`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;

  & > section {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 0.8rem;
    font-size: 1.8rem;
  }

  & > button {
    width: 200px;
    max-width: 300px;
  }

  & > .time {
    font-size: 1.5rem;
    bottom: 1rem;
  }
  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    & > button {
      max-width: 10rem;
    }

    & > section {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default CartSideBar;
