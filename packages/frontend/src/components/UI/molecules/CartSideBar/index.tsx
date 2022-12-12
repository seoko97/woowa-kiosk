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

  const [time, startTimer, stopTimer, setClearTime] = useClearTimer(
    () => {
      clearCart();
    },
    30000,
    [cartItems],
  );

  useEffect(() => {
    if (isOpenModal) {
      stopTimer();
    } else {
      setClearTime();
      if (cartItems.length === 0) {
        stopTimer();
        return;
      }
      startTimer();
    }
  }, [isOpenModal, cartItems]);

  return (
    <>
      <Container>
        <section>
          {cartItems.length !== 0 && <span>{time}초 남았습니다.</span>}
          <p>
            <span>총 </span>
            <span>{getLocaleStringNumber(totalPrice)}원</span>
          </p>
        </section>
        <section>
          <Button size="md" bColor="ERROR" disabled={isDisabled} onClick={clearCart}>
            비우기
          </Button>
          <Button size="md" disabled={isDisabled} onClick={openModal}>
            결제
          </Button>
        </section>
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
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 0.8rem;
    font-size: 1.2rem;
  }

  & > section:first-of-type {
    justify-content: space-between;
  }

  & button {
    width: 200px;
  }

  & > .time {
    font-size: 1.5rem;
    bottom: 1rem;
  }
  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    flex-direction: column;
    align-items: flex-start;
    & button {
      max-width: 10rem;
    }

    & > section {
      align-items: flex-start;
    }
  }
`;

export default CartSideBar;
