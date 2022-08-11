import React from "react";
import styled from "@emotion/styled";

import ModalPortal from "./ModalPortal";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalLayout: React.FC<Props> = ({ children, onClose }) => {
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
  min-height: 100%;
  z-index: 100;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default ModalLayout;
