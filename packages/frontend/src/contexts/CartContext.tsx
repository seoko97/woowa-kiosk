import { createContext, useContext, useMemo, useState } from "react";
import { IOrderDetail } from "src/types/order";
import { checkSameCartItem } from "src/utils/checkSameCartItem";

interface Props {
  children: React.ReactNode;
}

interface ICartActionContext {
  addCartItem: (cartItem: IOrderDetail) => void;
  deleteCartItem: (cartItem: IOrderDetail) => void;
  itemCountHandler: (cartItem: IOrderDetail, num: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<IOrderDetail[]>([]);
export const CartActionContext = createContext<ICartActionContext | null>(null);

export const useCartContext = () => useContext(CartContext);
export const useCartActionContext = () => useContext(CartActionContext);

export const CartProvider = ({ children }: Props) => {
  const [carts, setCarts] = useState<IOrderDetail[]>([]);

  const addCartItem = (cartItem: IOrderDetail) => {
    setCarts((prev) => {
      const newCart = [...prev];

      let idx = -1;

      const _item = newCart.filter((item, i) => {
        if (item.menuName !== cartItem.menuName) {
          return false;
        }

        const isValid = checkSameCartItem(item.options, cartItem.options);

        if (!isValid) {
          return false;
        }

        idx = i;
        return isValid;
      });

      if (_item.length > 0) {
        const newItem: IOrderDetail = { ..._item[0] };

        newItem.count += cartItem.count;
        newCart.splice(idx, 1, newItem);
      } else {
        newCart.push({ ...cartItem });
      }

      return newCart;
    });
  };

  const deleteCartItem = (cartItem: IOrderDetail) => {
    setCarts((prev) => {
      const newOrder = [...prev];
      const idx = newOrder.findIndex((item) => item === cartItem);

      if (idx === -1) {
        return prev;
      }

      newOrder.splice(idx, 1);

      return newOrder;
    });
  };

  const itemCountHandler = (cartItem: IOrderDetail, num: number) => {
    setCarts((prev) => {
      const newOrder = [...prev];

      const idx = newOrder.findIndex((item) => item === cartItem);

      if (idx === -1) {
        return prev;
      }

      const newItem = { ...newOrder[idx] };
      newItem.count = num;

      newOrder.splice(idx, 1, newItem);

      return newOrder;
    });
  };

  const clearCart = () => {
    setCarts([]);
  };

  const action: ICartActionContext = {
    clearCart,
    itemCountHandler,
    deleteCartItem,
    addCartItem,
  };

  return (
    <CartActionContext.Provider value={action}>
      <CartContext.Provider value={carts}>{children}</CartContext.Provider>
    </CartActionContext.Provider>
  );
};

export const useCart = () => {
  const value = useCartContext();

  if (!value) {
    throw new Error("장바구니가 존재하지 않습니다.");
  }

  return value;
};

export const useCartAction = () => {
  const value = useCartActionContext();

  if (!value) {
    throw new Error("장바구니가 존재하지 않습니다.");
  }

  return value;
};
