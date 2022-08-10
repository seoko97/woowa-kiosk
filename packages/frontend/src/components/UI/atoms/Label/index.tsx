import styled from "@emotion/styled";
import React from "react";

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const Label = ({ children, ...props }: Props) => <StyledLabel {...props}>{children}</StyledLabel>;

const StyledLabel = styled.label`
  cursor: pointer;
`;

export default Label;
