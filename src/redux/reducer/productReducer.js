import { ActionType } from "../actions/ActionType";

const initialState = {
  product_details: [],
  single_product: {},
  loading: false,
  error: null,
  index: 0,
  form_state: true,
  login_state: null,
  search_value:null
};

export const productReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ActionType.INCREMENT:
      const increaseQuantityOfItem = state.product_details.map((item) => {
        if (item.id === actions.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return {
        ...state,
        product_details: increaseQuantityOfItem,
      };

    case ActionType.DECREMENT:
      const decreaseQuantityOfItem = state.product_details.map((item) => {
        if (item.id === actions.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return {
        ...state,
        product_details: decreaseQuantityOfItem,
      };

    case ActionType.TOGGLECONTENT:
      const { id } = actions.payload;
      return {
        ...state,
        index: id,
      };

    case ActionType.SEARCH_ITEM:
      return {
        ...state,
        search_value: actions.payload,
      };

    case ActionType.TOGGLEFORM:
      return {
        ...state,
        form_state: !state.form_state,
      };

    case ActionType.LOGIN_STATE:
      return {
        ...state,
        login_state: actions.payload,
      };

    case ActionType.GET_PRODUCT:
      return {
        ...state,
        loading: true,
      };

    case ActionType.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product_details: actions.payload,
      };

    case ActionType.GET_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };

    case ActionType.GET_SINGLE_PRODUCT:
      return {
        ...state,
        loading: true,
      };

    case ActionType.GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        single_product: actions.payload,
      };

    case ActionType.GET_SINGLE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };

    case ActionType.ADD_PRODUCT:
    case ActionType.REMOVE_PRODUCT:
    case ActionType.EDIT_PRODUCT:
      return {
        ...state,
        loading: true,
      };

    case ActionType.ADD_PRODUCT_SUCCESS:
    case ActionType.REMOVE_PRODUCT_SUCCESS:
    case ActionType.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case ActionType.ADD_PRODUCT_FAIL:
    case ActionType.REMOVE_PRODUCT_FAIL:
    case ActionType.EDIT_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };

    default:
      return state;
  }
};
