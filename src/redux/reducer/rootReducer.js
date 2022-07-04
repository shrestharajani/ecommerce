import { userReducer } from "./userReducer";
import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { cartItems } from "./cartItems";

export const rootReducer = combineReducers({
  userReducer,
  productReducer,
  cartItems,
});
