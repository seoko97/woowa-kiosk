import styled from "@emotion/styled";
import { useCallback, useMemo, useState } from "react";
import { useCartAction } from "src/contexts/CartContext";
import CloseButton from "../UI/atoms/CloseButton";
import Bill from "../UI/organisms/Bill";

import OrderList from "../UI/organisms/OrderList";
import PaymentForm from "../UI/organisms/PaymentForm";
import ModalLayout from "./ModalLayout";

interface Props {
  onClose: () => void;
}

export type IStep = "ORDER_LIST" | "PAYMENT" | "IN_MONEY" | "SPINNER" | "BILL";
export type IPayment = "신용카드" | "현금";

const OrderModal = ({ onClose }: Props) => {
  const { clearCart } = useCartAction();
  const [step, setStep] = useState<IStep>("ORDER_LIST");
  const [payment, setPayment] = useState<IPayment>("신용카드");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [inputPrice, setInputPrice] = useState(0);

  const checkClose = useCallback(() => {
    if (loading) return;
    if (success) clearCart();
    onClose();
  }, [loading, onClose, success, clearCart]);

  const onNextStep = (next: IStep) => {
    setStep(next);
  };

  const paymentHandler = (pay: IPayment) => {
    setPayment(pay);
  };

  const inputPriceHandler = (value: number) => {
    setInputPrice(value);
  };
  const loadingHandler = (value: boolean) => {
    setLoading(value);
  };
  const successHandler = (value: boolean) => {
    setSuccess(value);
  };

  const checkCompos = useMemo(() => {
    switch (step) {
      case "ORDER_LIST":
        return <OrderList onClose={onClose} onNextStep={onNextStep} />;
      case "PAYMENT":
        return <PaymentForm onNextStep={onNextStep} paymentHandler={paymentHandler} />;
      case "IN_MONEY":
        return <></>;
      case "BILL":
        return (
          <Bill
            onClose={onClose}
            payment={payment}
            inputPrice={inputPrice}
            loadingHandler={loadingHandler}
            successHandler={successHandler}
          />
        );
      default:
        return <></>;
    }
  }, [step]);

  return (
    <ModalLayout onClose={checkClose}>
      <Container>
        {!loading && <CloseButton className="close" onClick={checkClose} />}
        {checkCompos}
        <div></div>
      </Container>
    </ModalLayout>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 35rem;
  height: 40rem;
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: opacity 0.5s;
  z-index: 101;
  padding: 1.4rem;

  & > .close {
    margin: 0;
    /* position: absolute; */
  }

  @media (max-width: ${({ theme }) => theme.BP.KIOSK}) {
    width: 100%;
  }
`;

export default OrderModal;
