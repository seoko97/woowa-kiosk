import { useCallback } from "react";
import styled from "@emotion/styled";
import { IMenuRes } from "src/types/menu";
import DetailMenuInfo from "src/components/UI/molecules/DetailMenuInfo";
import DetailMenuOption from "src/components/UI/molecules/DetailMenuOption";
import DetailMenuFooter from "src/components/UI/molecules/DetailMenuFooter";

import { useMenu } from "src/contexts/MenuContext";
import { useCartAction } from "src/contexts/CartContext";

import DetailContent from "./DetailContent";

interface Props {
  menu: IMenuRes;
  onCloseModal: () => void;
}

const DetailMenu = ({ menu, onCloseModal }: Props) => {
  const { options, name, imgUrl } = menu;
  const menuState = useMenu();
  const { addCartItem } = useCartAction();

  const updateCart: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      const { count } = menuState;

      if (count === 0) return;

      addCartItem({ ...menuState });
      onCloseModal();
    },
    [menuState, onCloseModal, addCartItem],
  );

  return (
    <Container>
      <div className="close" onClick={onCloseModal}>
        닫기
      </div>
      <DetailMenuInfo menuInfo={{ name, imgUrl }} />
      <DetailContent>
        <DetailMenuOption options={options} />
      </DetailContent>
      <DetailMenuFooter onCloseModal={onCloseModal} updateCart={updateCart} />
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > .close {
    position: absolute;
    top: 1rem;
    left: 1rem;
    cursor: pointer;
    font-size: 2rem;
  }
`;

export default DetailMenu;
