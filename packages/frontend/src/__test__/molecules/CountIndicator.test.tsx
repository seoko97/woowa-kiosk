import { fireEvent, screen } from "@testing-library/react";
import CountIndicator from "src/components/UI/molecules/CountIndicator";

import { render } from "../config";

beforeEach(() => {});
describe("Molecule <CountIndicator />", () => {
  it("렌더링 테스트", () => {
    let count = 0;

    const fn = (num: number) => {
      count += num;
    };

    render(<CountIndicator countHandler={fn} count={count} />);

    const button1 = screen.getByTestId("increase");
    const button2 = screen.getByTestId("decrease");

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });

  it("버튼 disabled 체크", () => {
    let count = 0;

    const fn = (num: number) => {
      count += num;
    };

    render(<CountIndicator countHandler={fn} count={count} />);

    const button1 = screen.getByTestId("increase");
    const button2 = screen.getByTestId("decrease");

    fireEvent.click(button2);

    expect(count).toEqual(0);
    expect(button2).toBeDisabled();

    fireEvent.click(button1);

    expect(count).toEqual(1);
  });
});
