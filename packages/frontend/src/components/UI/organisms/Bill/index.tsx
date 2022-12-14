import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useState } from "react";
import { requestCreateOrder } from "src/apis/order";
import { IPayment } from "src/components/modals/OrderModal";
import { useCart, useCartAction } from "src/contexts/CartContext";
import { useClearTimer } from "src/hooks/useClearTimer";
import { IOrder, IOrderDetail, IOrderRes } from "src/types/order";
import { getDateByNow } from "src/utils/getDateByNow";
import { getLocaleStringNumber } from "src/utils/getLocaleStringNumber";
import Button from "../../atoms/Button";
import OrderItemInfo from "../../molecules/OrderItem/OrderItemInfo";
import Spinner from "../../molecules/Spinner";

interface Props {
  payment: IPayment;
  inputPrice: number;
  onClose: () => void;
  loadingHandler: (value: boolean) => void;
  successHandler: (value: boolean) => void;
}

const Bill = ({ payment, inputPrice, onClose, loadingHandler, successHandler }: Props) => {
  const cartItems = useCart();
  const { clearCart } = useCartAction();
  const [bill, setBill] = useState<IOrderRes | null>(null);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, { count, menuPrice, options }) => {
      const optionTotalPrice: number = options.reduce(
        (acc, option) => (acc += option.optionDetailPrice),
        0,
      );

      return (acc += (optionTotalPrice + menuPrice) * count);
    }, 0);
  }, [cartItems]);

  const onClear = () => {
    onClose();
    clearCart();
  };

  const [time, startTimer] = useClearTimer(onClear, 10000);

  const createOrder = useCallback(async () => {
    const data: IOrder = {
      date: getDateByNow(),
      inputPrice: inputPrice || totalPrice,
      totalPrice,
      payment,
      orderDetails: cartItems,
    };

    const result = await requestCreateOrder(data);

    setTimeout(() => {
      loadingHandler(false);
      successHandler(true);
      setBill(result);
      startTimer();
    }, 2000);
  }, [totalPrice, cartItems, inputPrice, payment, startTimer, loadingHandler]);

  useEffect(() => {
    loadingHandler(true);
    createOrder();
  }, []);

  return (
    <Container>
      {!bill ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <>
          <h1>????????? ?????????????????????.</h1>
          <h2>????????????: {bill.orderNumber}</h2>
          <div className="list">
            {bill.orderDetails.map((menu) => (
              <OrderItemInfo key={menu.id} menu={menu as IOrderDetail} />
            ))}
          </div>
          <div className="desc">
            <h3>????????????: {bill.payment}</h3>
            <p>????????????: {getLocaleStringNumber(bill.inputPrice)}</p>
            <p>??? ????????????: {getLocaleStringNumber(bill.totalPrice)}</p>
            <p>??????: {getLocaleStringNumber(bill.inputPrice - bill.totalPrice)}</p>
          </div>
          <p>{`(??????: ??? ????????? ${time}?????? ???????????????.)`}</p>
          <Button size="md" onClick={onClear}>
            ??????????????????
          </Button>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  gap: 1rem;

  & > button {
    width: 100%;
  }

  & > .list {
    border-top: 2px dotted ${({ theme }) => theme.LINE};

    font-size: 1rem;
    width: 100%;
    padding: 1rem 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 300px;
    overflow-y: auto;
    flex-wrap: nowrap;
  }

  & > .desc {
    border-top: 2px dotted ${({ theme }) => theme.LINE};
    padding: 1rem 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Bill;
