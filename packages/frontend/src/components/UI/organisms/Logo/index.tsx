import styled from "@emotion/styled";

const Logo = () => {
  return (
    <StyledLogo>
      <p>우아한</p>
      <p className="accent">키오스크</p>
    </StyledLogo>
  );
};

const StyledLogo = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  row-gap: 12px;
  padding: 1.5rem 0;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.end};
  font-weight: 700;

  & > .accent {
    font-size: 3.2rem;
    color: ${({ theme }) => theme.PRIMARY1};
  }
`;

export default Logo;
