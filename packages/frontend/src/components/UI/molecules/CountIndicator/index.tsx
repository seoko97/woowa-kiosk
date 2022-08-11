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
    [count, countHandler],
  );

  const decreaseCount: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (count === 0) {
        return;
      }

      countHandler(count - 1);
    },
    [count, countHandler],
  );

  return (
    <Form>
      <button data-testid="increase" name="increase" onClick={increaseCount}>
        <PlusIcon />
      </button>
      <span className="count">{count}</span>
      <button data-testid="decrease" name="decrease" onClick={decreaseCount} disabled={count === 0}>
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
    font-size: 1rem;
    width: 2.2em;
    cursor: pointer;
    & svg {
      width: 100%;
      fill: ${({ theme }) => theme.BODY};
    }

    &:disabled {
      & svg {
        width: 100%;
        fill: ${({ theme }) => theme.PLACEHOLDER};
      }
    }
  }
`;

export default CountIndicator;
