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
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  gap: 3.5rem;
`;

export default Option;
