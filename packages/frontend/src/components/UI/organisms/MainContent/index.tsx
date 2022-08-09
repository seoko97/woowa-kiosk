import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import RowFrame from "../../template/RowFrame";

interface Props {
  children: React.ReactNode;
}

const MainContent: React.FC<Props> = ({ children }) => {
  const currentRef = useRef(children);

  useEffect(() => {
    currentRef.current = children;
  }, [children]);

  return <Container>{children}</Container>;
};

const Container = styled(RowFrame)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MainContent;
