import React from "react";
import styled from "@emotion/styled";
import RowFrame from "../RowFrame";

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return <StyledAppLayout>{children}</StyledAppLayout>;
};

const StyledAppLayout = styled(RowFrame)`
  display: flex;
  height: 100vh;

  flex-direction: column;
  overflow-x: hidden;
  overflow-y: visible;
  background-color: ${({ theme }) => theme.BACKGROUND};
  border: 1px solid ${({ theme }) => theme.LINE};
  z-index: 0;
`;

export default AppLayout;
