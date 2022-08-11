import styled from "@emotion/styled";
import { MouseEventHandler, useCallback } from "react";
import MinusIcon from "src/components/Icons/MinusIcon";
import PlusIcon from "src/components/Icons/PlusIcon";

interface Props {
  count: number;
  countHandler: (count: number) => void;
}

const CountIndicator = ({ count, countHandler }: Props) => {
  const increaseCount: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      countHandler(count + 1);
    },
    [count],
  );

  const decreaseCount: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (count === 0) {
        return;
      }

      countHandler(count - 1);
    },
    [count],
  );

  return (
    <Form>
      <button name="increase" onClick={increaseCount}>
        <PlusIcon />
      </button>
      <span className="count">{count}</span>
      <button name="decrease" onClick={decreaseCount}>
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
  font-size: 1em;
  gap: 1em;

  & > .count {
    min-width: 1.5em;
    font-size: 1.8em;
    text-align: center;
  }

  & > button {
    width: 2em;
    cursor: pointer;
    & svg {
      width: 100%;
      fill: ${({ theme }) => theme.BODY};
    }
  }
`;

export default CountIndicator;
