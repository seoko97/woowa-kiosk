import styled from "@emotion/styled";
import { IOrderDetail } from "src/types/order";
import { getLocaleStringNumber } from "src/utils/getLocaleStringNumber";
import Text from "../../atoms/Text";

interface Props {
  menu: IOrderDetail;
}

const OrderItemInfo = ({ menu }: Props) => {
  const { menuName, menuPrice, options, count } = menu;

  const optionPrice = options.reduce((acc, { optionDetailPrice }) => (acc += optionDetailPrice), 0);
  const totalPrice = (menuPrice + optionPrice) * count;

  return (
    <Container>
      <Inner>
        <h2>{menuName}</h2>
        <h3>{count}개</h3>
      </Inner>
      <p>{getLocaleStringNumber(totalPrice)}원</p>
      <div>
        <Text type="DESCRIPTION">
          {options.map(
            (option, i) => `${option.optionDetailName}${i !== options.length - 1 ? ", " : ""}`,
          )}
        </Text>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export default OrderItemInfo;
