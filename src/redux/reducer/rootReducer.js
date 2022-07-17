import { userReducer } from "./userReducer";
import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { cartItems } from "./cartItems";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  userReducer,
  productReducer,
  cartItems,
  authReducer,
});
