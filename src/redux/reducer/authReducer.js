import { ActionType } from "../actions/ActionType";

const initialState = {
  loading: false,
  currentUser: null,
  adminUser:null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REGISTER_START:
    case ActionType.LOGIN_START:
    case ActionType.LOGOUT_START:
      return {
        ...state,
        loading: true,
      };

    case ActionType.LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };

    case ActionType.REGISTER_SUCCESS:
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        adminUser:null
      };

    case ActionType.ADMIN_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        adminUser: action.payload,
        currentUser:null
      };

    case ActionType.SET_USER:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };

    case ActionType.REGISTER_FAIL:
    case ActionType.LOGIN_FAIL:
    case ActionType.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
