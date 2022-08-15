import styled from "@emotion/styled";
import { IOption } from "src/types/option";
import Option from "./Option";

interface Props {
  options: IOption[];
}

const DetailMenuOption = ({ options }: Props) => {
  return (
    <Container>
      {options.map((option, i) => (
        <Option key={option.id + i} option={option} />
      ))}
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4rem;
  overflow-y: auto;
  padding: 1rem;
`;

export default DetailMenuOption;
