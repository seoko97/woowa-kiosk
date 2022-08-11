import styled from "@emotion/styled";
import CloseIcon from "src/components/Icons/CloseIon";

const CloseButton = ({ onClick, ...props }: React.HTMLAttributes<HTMLButtonElement>) => (
  <StyledCloseButton onClick={onClick} {...props}>
    <CloseIcon />
  </StyledCloseButton>
);

const StyledCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

export default CloseButton;
