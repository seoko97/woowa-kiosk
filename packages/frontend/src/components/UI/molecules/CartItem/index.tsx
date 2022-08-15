import styled from "@emotion/styled";
import { useCallback, useMemo } from "react";
import { useCartAction } from "src/contexts/CartContext";
import { IOrderDetail } from "src/types/order";
import { getLocaleStringNumber } from "src/utils/getLocaleStringNumber";
import CloseButton from "../../atoms/CloseButton";
import Image from "../../atoms/Image";
import Text from "../../atoms/Text";
import CountIndicator from "../CountIndicator";

interface Props {
  item: IOrderDetail;
  deleteItem: (cartItem: IOrderDetail) => void;
}

const CartItem = ({ item, deleteItem }: Props) => {
  const { count, menuPrice, menuImgUrl, options } = item;
  const { itemCountHandler } = useCartAction();

  const totalPrice = useMemo(() => {
    const optionTotalPrice = options.reduce((acc, option) => (acc += option.optionDetailPrice), 0);

    return (optionTotalPrice + menuPrice) * count;
  }, [count, options, menuPrice]);

  const onClickDeleteButton: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    deleteItem(item);
  }, [deleteItem, item]);

  const countHandler = useCallback(
    (count: number) => {
      if (count < 1) return;

      itemCountHandler(item, count);
    },
    [itemCountHandler, item],
  );

  return (
    <Container>
      <CloseButton className="delete" onClick={onClickDeleteButton} />
      <Image src={menuImgUrl} width="100%" />
      <CountIndicator count={count} countHandler={countHandler} />
      <Text type="DESCRIPTION">{getLocaleStringNumber(totalPrice)}원</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 10rem;
  height: 100%;
  font-size: 0.8rem;
  gap: 2px;
  background-color: ${({ theme }) => theme.WHITE};
  color: ${({ theme }) => theme.DARK_GREEN};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.1);

  border-radius: 10px;
  padding: 0.8rem;

  & > .delete {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
    width: 1rem;
    height: 1rem;
  }

  & svg {
    fill: ${({ theme }) => theme.DARK_GREEN};
  }
`;

export default CartItem;
