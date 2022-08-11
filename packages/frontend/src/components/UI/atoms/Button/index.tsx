import React, { memo } from "react";
import styled from "@emotion/styled";
import { IColor, ISize } from "src/theme/types";

interface ButtonProps {
  size: ISize;
  bColor: IColor;
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, Partial<ButtonProps> {}

const Button: React.FC<Props> = ({ size = "sm", bColor = "PRIMARY1", children, ...props }) => {
  return (
    <StyledButton bColor={bColor} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  box-sizing: border-box;
  font-size: ${({ theme, size }) => theme.FONT_SIZE[size]};
  padding: ${({ theme, size }) => theme.BUTTON_SIZE[size]};
  background-color: ${({ theme, bColor }) => theme[bColor]};
  color: ${({ theme }) => theme.WHITE};
  border-radius: 10px;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.WHITE};
    color: ${({ theme, bColor }) => theme[bColor]};
    border: 2px solid ${({ theme, bColor }) => theme[bColor]};
    cursor: default;
  }
`;

export default memo(Button);
