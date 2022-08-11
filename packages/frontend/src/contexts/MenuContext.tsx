import { createContext, useContext, useMemo, useState } from "react";
import { IOrderDetail, IOrderOptionSnapShot } from "src/types/order";
import { getValidItemIndex } from "src/utils/getValidItemIndex";

interface Props {
  children: React.ReactNode;
}

export interface IMenuActionContext {
  optionHandler: (snapShot: IOrderOptionSnapShot, checked: boolean, isDuplicate: boolean) => void;
  countHandler: (count: number) => void;
  initMenu: (menu: IOrderDetail) => void;
}

const initialState: IOrderDetail = {
  menuImgUrl: "",
  menuName: "",
  menuPrice: 0,
  count: 0,
  options: [],
};

export const MenuContext = createContext<IOrderDetail | null>(null);
export const MenuActionContext = createContext<IMenuActionContext | null>(null);

export const useMenuContext = () => useContext(MenuContext);
export const useMenuActionContext = () => useContext(MenuActionContext);

export const MenuProvider = ({ children }: Props) => {
  const [order, setOrder] = useState<IOrderDetail>(initialState);

  const action: IMenuActionContext = useMemo(
    () => ({
      optionHandler: (snapShot, checked, isDuplicate) => {
        setOrder((prev) => {
          const newOrder: IOrderDetail = { ...prev };
          const newOptions = [...newOrder.options];

          // 체크되지 않았다면?
          if (!checked) {
            // 삭제되는 경우 (이경우는 체크박스만), 옵션이름과 상세이름이 같은(완전 일치) 아이템을 찾아 제거
            const idx = getValidItemIndex(newOptions, snapShot, ["optionName", "optionDetailName"]);
            newOptions.splice(idx, 1, { ...snapShot });
          } else {
            if (isDuplicate) {
              // 해당 옵션의 중복이 허용됐다면 추가한다.
              newOptions.push({ ...snapShot });
            } else {
              // 허용되지 않았다면 같은 옵션이름을 가진 스냅샷을 찾아 교체한다.
              const idx = getValidItemIndex(newOptions, snapShot, ["optionName"]);
              newOptions.splice(idx, 1, { ...snapShot });
            }
          }

          newOrder.options = newOptions;

          return newOrder;
        });
      },
      countHandler: (count) => {
        setOrder((prev) => {
          const newOrder = { ...prev };
          newOrder.count = count;

          return newOrder;
        });
      },
      initMenu: (menu) => {
        setOrder(menu);
      },
    }),
    [],
  );

  return (
    <MenuActionContext.Provider value={action}>
      <MenuContext.Provider value={order}>{children}</MenuContext.Provider>
    </MenuActionContext.Provider>
  );
};

export const useMenu = () => {
  const value = useMenuContext();

  if (value === null) {
    throw new Error("장바구니가 존재하지 않습니다.");
  }

  return value;
};
export const useMenuAction = () => {
  const value = useMenuActionContext();

  if (value === null) {
    throw new Error("장바구니가 존재하지 않습니다.");
  }

  return value;
};
