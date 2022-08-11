import { fireEvent, screen } from "@testing-library/react";
import CountIndicator from "src/components/UI/molecules/CountIndicator";
import OptionDetail from "src/components/UI/molecules/DetailMenuOption/OptionDetail";
import { IMenuActionContext, MenuActionContext } from "src/contexts/MenuContext";
import { IOptionDetail } from "src/types/option";

import { render } from "../config";

const action: IMenuActionContext = {
  countHandler() {},
  optionHandler() {},
  initMenu() {},
};

describe("Molecule <OptionDetail />", () => {
  const detail = { name: "test", price: 1000, id: 1 } as IOptionDetail;

  it("렌더링 테스트", () => {
    render(
      <MenuActionContext.Provider value={action}>
        <OptionDetail
          detail={detail}
          isDefaultChecked={true}
          isDuplicate={false}
          optionName={"옵션"}
        />
      </MenuActionContext.Provider>,
    );

    const checkbox = screen.getByTestId("test1");

    expect(checkbox).toBeInTheDocument();
  });

  it("중복 체크가 안될때는 라디오 버튼(클릭시 변경 안됨)", () => {
    render(
      <MenuActionContext.Provider value={action}>
        <OptionDetail
          detail={detail}
          isDefaultChecked={true}
          isDuplicate={false}
          optionName={"옵션"}
        />
      </MenuActionContext.Provider>,
    );

    const checkbox = screen.getByTestId("test1");

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("중복 체크 허용일때는 체크박스(클릭시 체크 됨)", () => {
    render(
      <MenuActionContext.Provider value={action}>
        <OptionDetail
          detail={detail}
          isDefaultChecked={false}
          isDuplicate={true}
          optionName={"옵션"}
        />
      </MenuActionContext.Provider>,
    );

    const checkbox = screen.getByTestId("test1");

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
