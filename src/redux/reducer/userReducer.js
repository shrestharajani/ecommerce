import { ActionType } from "../actions/ActionType";

const initialState = {
  user_details: [],
  loading: false,
  error: null,
  order_details: [],
};

export const userReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ActionType.GET_USER:
    case ActionType.GET_HISTORY_START:
      return {
        ...state,
        loading: true,
      };

    case ActionType.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user_details: actions.payload,
      };

    case ActionType.GET_PURCHASE_HISTORY:
      return {
        ...state,
        loading: false,
        order_details: actions.payload,
      };

    case ActionType.GET_USER_FAIL:
    case ActionType.GET_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };

    case ActionType.ADD_USER:
    case ActionType.ADD_HISTORY_START:
      return {
        ...state,
        loading: true,
      };

    case ActionType.ADD_USER_SUCCESS:
    case ActionType.ADD_PURCHASE_HISTORY:
      return {
        ...state,
        loading: false,
      };

    case ActionType.ADD_USER_FAIL:
    case ActionType.ADD_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };

    default:
      return state;
  }
};
