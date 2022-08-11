import styled from "@emotion/styled";
import CloseIcon from "src/components/Icons/CloseIon";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
}

const CloseButton = ({ width = "1.5rem", height = "1.5rem", onClick, ...props }: Props) => (
  <StyledCloseButton width={width} height={height} onClick={onClick} {...props}>
    <CloseIcon />
  </StyledCloseButton>
);

const StyledCloseButton = styled.button<{ width?: string; height?: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  cursor: pointer;
  z-index: 1;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

export default CloseButton;
