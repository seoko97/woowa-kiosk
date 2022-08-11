import styled from "@emotion/styled";
import { useMemo } from "react";
import OrderModal from "src/components/modals/OrderModal";
import { useCart } from "src/contexts/CartContext";
import useModal from "src/hooks/useModal";
import { getLocaleStringNumber } from "src/utils/getLocaleStringNumber";
import Button from "../../atoms/Button";

const CartSideBar = () => {
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

  return (
    <>
      <Container>
        <section>
          <span>총 </span>
          <span>{getLocaleStringNumber(totalPrice)}원</span>
        </section>
        <Button size="lg" disabled={isDisabled} onClick={openModal}>
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
  justify-content: flex-end;
  gap: 2rem;

  & > section {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 0.8rem;
    font-size: 1.8rem;
  }

  & > button {
    width: 100%;
    max-width: 300px;
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
