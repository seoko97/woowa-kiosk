import React from "react";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return <StyledAppLayout>{children}</StyledAppLayout>;
};

const StyledAppLayout = styled.div`
  width: 100%;
  min-height: 100vh;

  position: relative;
  padding-bottom: 140px;
  background-color: ${({ theme }) => theme.BACKGROUND};
  z-index: 0;
`;

export default AppLayout;
