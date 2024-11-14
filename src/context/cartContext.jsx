import { createContext, useReducer } from "react";

const CartContext = createContext({
  cartList: [],
  increaseItem: () => {},
  decreaseItem: () => {},
});

const intitialState = {
  cartList: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "INCREASE_ITEM": {
      const cartList = [...state.cartList];
      const item = cartList.find((item) => action.item.id === item.itemId);
      if (item) {
        item.quantity++;
      } else {
        cartList.push(item);
      }
      return {
        ...state,
        cartList,
      };
    }
    case "DECREASE_ITEM": {
      const cartList = [...state.cartList];
      const index = cartList.findIndex((item) => action.item.id === item.id);
      if (index !== -1) {
        if (cartList[index].quantity > 1) {
          cartList[index].quantity--;
        } else {
          cartList.splice(index, 1);
        }
      }

      return {
        ...state,
        cartList,
      };
    }
  }
};

//Có thể dùng kết hợp useReducer sau, hỏi để tối ưu đoạn này thay vì dùng useState để code state có logic lớn
export const CartContextProvider = ({ children }) => {
  const [cartList, dispatch] = useReducer(cartReducer, intitialState);

  const increaseItem = (item) => {
    dispatch({
      type: "INCREASE_ITEM",
      item,
    });
  };

  const decreaseItem = (item) => {
    dispatch({
      type: "DECREASE_ITEM",
      item,
    });
  };

  return (
    <CartContext.Provider value={{ cartList, increaseItem, decreaseItem }}>
      {children}
    </CartContext.Provider>
  );
};
