const INIT_STATE = {
  cart: [],
};

export const cartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        return {
          ...state,
          cart: [...state.cart, temp],
        };
      }

    case "DLT_CART":
      const data = state.cart.filter((ele) => ele.id !== action.payload);
      return {
        ...state,
        cart: data,
      };

    case "RMV_CART":
      const itemId = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemId >= 0) {
        const updatedCart = [...state.cart];

        if (updatedCart[itemId].qnty > 1) {
          updatedCart[itemId].qnty -= 1; // Decrease quantity by 1
        }

        return {
          ...state,
          cart: updatedCart,
        };
      }

    default:
      return state;
  }
};
