import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import DetailMenu from "src/components/modals/DetailMenuModal";
import Menu from "src/components/UI/molecules/Menu";
import useModal from "src/hooks/useModal";
import { IMenusRes } from "src/types/menu";

interface Props {
  menus: IMenusRes[];
}

const MenuList = ({ menus }: Props) => {
  const [selectedMenu, setSelectedMenu] = useState<IMenusRes | null>(null);
  const [isOpen, onOpen, onClose] = useModal();

  const onClickMenu = useCallback((menu: IMenusRes) => {
    setSelectedMenu(menu);
    onOpen();
  }, []);

  return (
    <>
      <Container>
        {menus.map((menu) => (
          <Menu onClick={onClickMenu} key={menu.id} menu={menu} />
        ))}
      </Container>
      {isOpen && selectedMenu && <DetailMenu onClose={onClose} menu={selectedMenu} />}
    </>
  );
};

const Container = styled.section`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem;
  gap: 2rem 1.2rem;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default MenuList;
