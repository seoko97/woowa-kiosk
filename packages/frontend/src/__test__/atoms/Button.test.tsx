import { screen, fireEvent } from "@testing-library/react";
import Button from "src/components/UI/atoms/Button";

import { render } from "../config";

beforeEach(() => {});
describe("Atom <Button />", () => {
  it("버튼 렌더링 테스트", () => {
    render(<Button>클릭</Button>);

    const button = screen.getByText("클릭");

    expect(button).toBeInTheDocument();
  });

  it("버튼 클릭 이벤트", () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>클릭</Button>);

    const button = screen.getByText("클릭");

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("버튼 Disabled 테스트", () => {
    const onClick = jest.fn();

    render(
      <Button disabled onClick={onClick}>
        클릭
      </Button>,
    );

    const button = screen.getByText("클릭");

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(0);
    expect(button).toBeDisabled();
  });
});
