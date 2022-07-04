import { ActionType } from "../actions/ActionType";

export function userReducer(state = null, action) {
  switch (action.type) {
    case ActionType.LOGGED_IN_USER:
      return action.payload;

    case ActionType.LOGOUT:
      return action.payload;

    default:
      return state;
  }
}
