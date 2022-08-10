import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { IMenuRes, IMenusRes } from "src/types/menu";
import ModalLayout from "./ModalLayout";
import { requestGetMenuById } from "src/apis/menu";
import DetailMenu from "../UI/organisms/DetailMenu";
import { MenuProvider } from "src/contexts/MenuContext";
import { getOptionDetail } from "src/utils/optionDetail";
import { IOrderDetail } from "src/types/order";
import { CartProvider } from "src/contexts/CartContext";

interface Props {
  onClose: () => void;
  menu: IMenusRes;
}

const DetailMenuModal = ({ onClose, menu }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isClose, setIsClose] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<IMenuRes | null>(null);
  const [initOrderState, setInitOrderState] = useState<IOrderDetail | null>(null);

  const getMenu = async () => {
    const data = await requestGetMenuById(menu.id);

    setSelectedMenu(data);
    setInitOrderState({
      count: 0,
      menuName: data.name,
      menuPrice: data.price,
      options: getOptionDetail(data.options),
    });
    setTimeout(() => ref.current?.classList.add("active"), 50);
  };

  useEffect(() => {
    getMenu();
  }, []);

  const onCloseModal = useCallback(() => {
    if (isClose || !ref.current) return;

    setIsClose(true);
    ref.current.classList.remove("active");
    ref.current.classList.add("disabled");

    setTimeout(() => onClose(), 300);
  }, [isClose]);

  if (!initOrderState) return <></>;

  return (
    <ModalLayout isClose={isClose} onClose={onCloseModal}>
      <Container ref={ref}>
        {selectedMenu && (
          <CartProvider>
            <MenuProvider initialState={initOrderState}>
              <DetailMenu onCloseModal={onCloseModal} menu={selectedMenu} />
            </MenuProvider>
          </CartProvider>
        )}
      </Container>
    </ModalLayout>
  );
};

const Container = styled.div`
  position: relative;
  width: 1040px;
  background-color: #fff;
  z-index: 101;
  top: 100%;
  transition: top 0.5s, opacity 0.5s;
  opacity: 0;

  &.active {
    top: 0;
    opacity: 1;
  }
  &.disabled {
    pointer-events: none;
  }
`;

export default DetailMenuModal;
