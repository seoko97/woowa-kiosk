import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { IMenuRes, IMenusRes } from "src/types/menu";
import ModalLayout from "./ModalLayout";
import { requestGetMenuById } from "src/apis/menu";
import DetailMenu from "../UI/organisms/DetailMenu";
import { getOptionDetail } from "src/utils/optionDetail";
import { useMenuAction } from "src/contexts/MenuContext";

interface Props {
  onClose: () => void;
  menu: IMenusRes;
}

const DetailMenuModal = ({ onClose, menu }: Props) => {
  const { initMenu } = useMenuAction();
  const ref = useRef<HTMLDivElement>(null);
  const [isClose, setIsClose] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<IMenuRes | null>(null);

  const getMenu = async () => {
    const data = await requestGetMenuById(menu.id);

    setSelectedMenu(data);
    initMenu({
      count: 0,
      menuName: data.name,
      menuPrice: data.price,
      menuImgUrl: data.imgUrl,
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

  return (
    <ModalLayout onClose={onCloseModal}>
      <Container ref={ref}>
        {selectedMenu && <DetailMenu onCloseModal={onCloseModal} menu={selectedMenu} />}
      </Container>
    </ModalLayout>
  );
};

const Container = styled.div`
  position: relative;
  width: 1040px;
  height: 100vh;
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

  @media (max-width: ${({ theme }) => theme.BP.KIOSK}) {
    width: 100%;
  }
`;

export default DetailMenuModal;
