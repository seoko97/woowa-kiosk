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
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 20rem;
  z-index: 0;
`;

export default AppLayout;
