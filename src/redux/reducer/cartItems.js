import { ActionType } from "../actions/ActionType";

const initialState = {
  cart_item: [],
  total: 0,
  cartItemCount: 0,
};

export const cartItems = (state = initialState, actions) => {
  switch (actions.type) {
    case ActionType.ITEM_TO_CART:
      const product = actions.payload;
      return {
        ...state,
        cart_item: [...state.cart_item, product],
        total: state.total + product.price * product.quantity,
        cartItemCount: state.cartItemCount + 1,
      };

    case ActionType.ITEM_DELETE_CART:
      const { products, total, count } = actions.payload;
      return {
        ...state,
        cart_item: products,
        total: total,
        cartItemCount: count,
      };

    default:
      return state;
  }
};
