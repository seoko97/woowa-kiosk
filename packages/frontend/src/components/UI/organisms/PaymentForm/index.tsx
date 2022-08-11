import styled from "@emotion/styled";
import { useCallback } from "react";
import { IPayment, IStep } from "src/components/modals/OrderModal";
import PaymentItem from "../../molecules/PaymentItem";

interface Props {
  onNextStep: (next: IStep) => void;
  paymentHandler: (pay: IPayment) => void;
}

const PaymentForm = ({ onNextStep, paymentHandler }: Props) => {
  const onClickMoney = useCallback(() => {
    onNextStep("IN_MONEY");
    paymentHandler("현금");
  }, [onNextStep, paymentHandler]);

  const onClickCreditCard = useCallback(() => {
    onNextStep("BILL");
    paymentHandler("신용카드");
  }, [onNextStep, paymentHandler]);

  return (
    <Container>
      <PaymentItem onClick={onClickMoney}>현금</PaymentItem>
      <PaymentItem onClick={onClickCreditCard}>카드</PaymentItem>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  & > *:first-of-type {
    border-right: 1px solid ${({ theme }) => theme.LINE};
  }
`;

export default PaymentForm;
