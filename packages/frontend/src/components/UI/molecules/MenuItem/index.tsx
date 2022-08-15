import styled from "@emotion/styled";
import { memo } from "react";
import { IMenusRes } from "src/types/menu";
import { getLocaleStringNumber } from "src/utils/getLocaleStringNumber";
import Image from "../../atoms/Image";

interface Props {
  menu: IMenusRes;
  onClick: (menu: IMenusRes) => void;
}

const Menu = ({ menu, onClick }: Props) => {
  return (
    <Container onClick={() => onClick(menu)}>
      <Image src={menu.imgUrl} />
      <p className="name">{menu.name}</p>
      <p className="price">{getLocaleStringNumber(menu.price)}원</p>
    </Container>
  );
};

const Container = styled.div`
  height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1.1rem;
  cursor: pointer;

  & > .name {
    text-align: center;
    line-height: 1.5rem;
  }
  & > .price {
    color: ${({ theme }) => theme.TITLE_ACTIVE};
  }
`;

export default memo(Menu, (prev, next) => prev.menu === next.menu);
