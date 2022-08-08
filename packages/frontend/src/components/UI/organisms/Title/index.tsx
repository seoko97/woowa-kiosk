import styled from "@emotion/styled";
import RowFrame from "../../template/RowFrame";

const Title = () => {
  return (
    <StyledTitle>
      <p>우아한</p>
      <p className="accent">키오스크</p>
    </StyledTitle>
  );
};

const StyledTitle = styled.section`
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

export default Title;
