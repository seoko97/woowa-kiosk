import styled from "@emotion/styled";
import React from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const PaymentItem = ({ children, onClick }: Props) => {
  return <Container onClick={onClick}>{children}</Container>;
};

const Container = styled.section`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.LINE};
  }
`;

export default PaymentItem;
