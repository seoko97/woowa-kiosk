import styled from "@emotion/styled";
import { MouseEventHandler, useCallback } from "react";
import MinusIcon from "src/components/Icons/MinusIcon";
import PlusIcon from "src/components/Icons/PlusIcon";

interface Props {
  count: number;
  countHandler: (count: number) => void;
}

const CountIndicator = ({ count, countHandler }: Props) => {
  const onClickIndicator: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();

      const $target = e.currentTarget;

      if ($target.name === "increase") {
        countHandler(count + 1);
      } else {
        if (count === 0) return;
        countHandler(count - 1);
      }
    },
    [count],
  );

  return (
    <Form>
      <button name="increase" onClick={onClickIndicator}>
        <PlusIcon />
      </button>
      <span className="count">{count}</span>
      <button name="decrease" onClick={onClickIndicator}>
        <MinusIcon />
      </button>
    </Form>
  );
};

const Form = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  & > .count {
    font-size: 3rem;
    text-align: center;
  }

  & > button {
    font-size: 1em;
    width: 2em;
    cursor: pointer;
    & svg {
      width: 100%;
      fill: ${({ theme }) => theme.BODY};
    }
  }
`;

export default CountIndicator;
