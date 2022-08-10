import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { ThemeType } from "src/theme";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: "radio" | "checkbox";
}

const CheckBox = ({ name, ...props }: Props) => {
  const isRadio = props.type === "radio";

  return <StyledCheckBox name={name} {...props} isRadio={isRadio} />;
};

const StyledCheckBox = styled.input<{ isRadio: boolean }>`
  font: inherit;
  width: 30px;
  height: 30px;
  border: 0.15em solid ${({ theme }) => theme.PLACEHOLDER};
  border-radius: ${({ isRadio }) => (isRadio ? "50%" : "10px")};
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  margin: 0;
  cursor: pointer;

  ${({ isRadio, theme }) => (isRadio ? radio(theme) : check(theme))}

  &:checked {
    border: 0.15em solid ${({ theme }) => theme.PRIMARY1};
    background-color: ${({ theme }) => theme.PRIMARY1};
  }
`;

const radio = (theme: ThemeType) => css`
  &::before {
    content: "";
    background-color: ${theme.PLACEHOLDER};
    border-radius: 50%;
    width: 0.8rem;
    height: 0.8rem;
    transform: scale(0);
    transition: transform 0.2s ease-in-out;
  }
  &:checked::before {
    transform: scale(1);
    background-color: ${theme.WHITE};
  }
`;

const check = (theme: ThemeType) => css`
  &::before {
    content: "";
    position: relative;
    top: -2px;
    width: 0.5rem;
    height: 0.7rem;
    border: solid ${theme.PLACEHOLDER};
    border-width: 0px 3px 3px 0px;
    transform: rotate(45deg);
  }

  &:checked::before {
    border-color: ${theme.WHITE};
  }
`;

export default CheckBox;
