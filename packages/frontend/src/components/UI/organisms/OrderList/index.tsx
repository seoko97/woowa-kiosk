import styled from "@emotion/styled";
import { useCallback } from "react";
import { IStep } from "src/components/modals/OrderModal";
import { useCart } from "src/contexts/CartContext";
import Button from "../../atoms/Button";
import OrderItem from "../../molecules/OrderItem";

interface Props {
  onClose: () => void;
  onNextStep: (next: IStep) => void;
}

const OrderList = ({ onClose, onNextStep }: Props) => {
  const orderItems = useCart();

  const onClick = useCallback(() => {
    onNextStep("PAYMENT");
  }, [onNextStep]);

  return (
    <Container>
      <ItemList>
        {orderItems.map((item, i) => (
          <OrderItem key={item.menuName + i} menu={item} />
        ))}
      </ItemList>
      <ButtonList>
        <Button size="md" bColor="ERROR" onClick={onClose}>
          취소
        </Button>
        <Button size="md" onClick={onClick}>
          결제
        </Button>
      </ButtonList>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const ItemList = styled.div`
  width: 100%;
  flex: 1;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: auto;
  flex-wrap: nowrap;
  gap: 1rem;
`;

const ButtonList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: auto;
  & > button {
    flex: 1;
  }
`;

export default OrderList;
