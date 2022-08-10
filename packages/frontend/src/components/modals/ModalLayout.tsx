import React from "react";
import styled from "@emotion/styled";

import ModalPortal from "./ModalPortal";

interface Props {
  onClose: () => void;
  isClose?: boolean;
  children: React.ReactNode;
}

const ModalLayout: React.FC<Props> = ({ children, onClose, isClose }) => {
  return (
    <ModalPortal>
      <Container>
        <Overlay onClick={onClose} />
        {children}
      </Container>
    </ModalPortal>
  );
};

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 100;
`;

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default ModalLayout;
