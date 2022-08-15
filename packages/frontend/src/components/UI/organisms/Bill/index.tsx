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
          <h1>주문이 완료되었습니다.</h1>
          <h2>주문번호: {bill.orderNumber}</h2>
          <div className="list">
            {bill.orderDetails.map((menu) => (
              <OrderItemInfo key={menu.id} menu={menu as IOrderDetail} />
            ))}
          </div>
          <div className="desc">
            <h3>결제방식: {bill.payment}</h3>
            <p>투입금액: {getLocaleStringNumber(bill.inputPrice)}</p>
            <p>총 결제금액: {getLocaleStringNumber(bill.totalPrice)}</p>
            <p>잔돈: {getLocaleStringNumber(bill.inputPrice - bill.totalPrice)}</p>
          </div>
          <p>{`(주의: 이 화면은 ${time}초뒤 사라집니다.)`}</p>
          <Button size="md" onClick={onClear}>
            주문하러가기
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
