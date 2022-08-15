import styled from "@emotion/styled";
import { IOption } from "src/types/option";
import OptionDetail from "./OptionDetail";

interface Props {
  option: IOption;
}

const Option = ({ option }: Props) => {
  const { name, details, isDuplicate } = option;

  return (
    <Container>
      <h3>{name}</h3>
      <Inner>
        {details.map((optionDetail, i) => (
          <OptionDetail
            key={optionDetail.id}
            detail={optionDetail}
            optionName={name}
            isDefaultChecked={i === 0}
            isDuplicate={isDuplicate}
          />
        ))}
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  padding: 0 2rem;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export default Option;
