import { ActionType } from "../actions/ActionType";

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REGISTER_START:
      return {
        ...state,
        loading: true,
      };

    case ActionType.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };

    case ActionType.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
