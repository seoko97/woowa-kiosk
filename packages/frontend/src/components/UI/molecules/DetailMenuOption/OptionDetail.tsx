import styled from "@emotion/styled";
import { IOptionDetail } from "src/types/option";
import { IOrderOptionSnapShot } from "src/types/order";
import { getLocaleStringNumber } from "src/utils/getLocaleStringNumber";
import Label from "../../atoms/Label";
import CheckBox from "../../atoms/CheckBox";
import { useCallback } from "react";
import { useMenuAction } from "src/contexts/MenuContext";

interface Props {
  optionName: string;
  detail: IOptionDetail;
  isDefaultChecked: boolean;
  isDuplicate: boolean;
}
const OptionDetail = ({ detail, optionName, isDefaultChecked, isDuplicate }: Props) => {
  const { optionHandler } = useMenuAction();
  const { name, price, id } = detail;
  const typeName = isDuplicate ? "checkbox" : "radio";

  const info: IOrderOptionSnapShot = {
    optionName,
    optionDetailName: name,
    optionDetailPrice: price,
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    optionHandler(info, e.target.checked, isDuplicate);
  }, []);

  return (
    <Container>
      <CheckBox
        type={typeName}
        id={optionName + id}
        name={optionName}
        defaultChecked={isDefaultChecked}
        onChange={onChange}
      />
      <Label htmlFor={optionName + id}>
        <span>{name}</span>
        <span>+ {getLocaleStringNumber(price)}</span>
      </Label>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.5rem;

  & > label {
    display: flex;
    padding-left: 20px;
    gap: 20px;
  }
`;

export default OptionDetail;
