import { fireEvent, screen } from "@testing-library/react";
import DetailMenuFooter from "src/components/UI/molecules/DetailMenuFooter";
import { MenuContext } from "src/contexts/MenuContext";
import { IOrderDetail } from "src/types/order";
import { getLocaleStringNumber } from "src/utils/getLocaleStringNumber";

import { render } from "../config";

beforeEach(() => {});
describe("Molecule <DetailMenuFooter />", () => {
  const initialState2: IOrderDetail = {
    count: 0,
    menuImgUrl: "",
    menuName: "",
    menuPrice: 1000,
    options: [],
  };

  it("렌더링 테스트", () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    const total = getLocaleStringNumber(initialState2.count * initialState2.menuPrice);

    render(
      <MenuContext.Provider value={initialState2}>
        <DetailMenuFooter onCloseModal={fn1} updateCart={fn2} />
      </MenuContext.Provider>,
    );

    const button1 = screen.getByText("취소");
    const button2 = screen.getByText(`총 ${total}원 담기`);

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });

  it("count가 0이라면 클릭 X", () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    const total = getLocaleStringNumber(initialState2.count * initialState2.menuPrice);

    render(
      <MenuContext.Provider value={initialState2}>
        <DetailMenuFooter onCloseModal={fn1} updateCart={fn2} />
      </MenuContext.Provider>,
    );

    const button1 = screen.getByText("취소");
    const button2 = screen.getByText(`총 ${total}원 담기`);

    fireEvent.click(button1);
    fireEvent.click(button2);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(0);
    expect(button2).toBeDisabled();
  });

  it("count가 0이 아니라면 클릭 O", () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    initialState2.count = 10;

    const total = getLocaleStringNumber(initialState2.count * initialState2.menuPrice);

    render(
      <MenuContext.Provider value={initialState2}>
        <DetailMenuFooter onCloseModal={fn1} updateCart={fn2} />
      </MenuContext.Provider>,
    );

    const button1 = screen.getByText("취소");
    const button2 = screen.getByText(`총 ${total}원 담기`);

    fireEvent.click(button1);
    fireEvent.click(button2);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(button2).toBeEnabled();
  });
});
