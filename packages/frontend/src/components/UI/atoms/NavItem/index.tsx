import styled from "@emotion/styled";
import { memo } from "react";

interface Props {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  className: string;
}

const NavItem = ({ text, onClick, className }: Props) => {
  return (
    <StyledNavItem onClick={onClick} className={className}>
      {text}
    </StyledNavItem>
  );
};

const StyledNavItem = styled.div`
  display: flex;
  padding: 1rem 2rem;
  margin: 1rem 1.4rem;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.PRIMARY3};
  font-size: 1.3rem;
  border-radius: 0.5rem;
  flex: 0 0 auto;
  transition: background-color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s;

  &.selected {
    background-color: ${({ theme }) => theme.PRIMARY1};
    color: ${({ theme }) => theme.WHITE};
    transition: background-color 0.3s, color 0.3s;
  }
`;

export default memo(
  NavItem,
  (prev, next) => prev.text === next.text && prev.className === next.className,
);
