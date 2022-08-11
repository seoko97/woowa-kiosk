import styled from "@emotion/styled";
import { useMemo } from "react";
import { useMenu } from "src/contexts/MenuContext";
import { getLocaleStringNumber } from "src/utils/getLocaleStringNumber";
import Button from "../../atoms/Button";

interface Props {
  onCloseModal: () => void;
  updateCart: React.MouseEventHandler<HTMLButtonElement>;
}

const DetailMenuFooter = ({ onCloseModal, updateCart }: Props) => {
  const { count, menuPrice, options } = useMenu();
  const totalPrice = useMemo(() => {
    const optionPrice = options.reduce(
      (acc, { optionDetailPrice }) => (acc += optionDetailPrice),
      0,
    );

    return (optionPrice + menuPrice) * count;
  }, [count, menuPrice, options]);

  return (
    <Container>
      <Button onClick={onCloseModal} bColor="ERROR" size="lg">
        취소
      </Button>
      <Button onClick={updateCart} size="lg" disabled={count === 0}>
        총 {getLocaleStringNumber(totalPrice)}원 담기
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding: 2rem;

  gap: 20px;

  & > button {
    flex: 1;
    height: 8rem;
  }
`;

export default DetailMenuFooter;
