import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "./reducer/rootReducer";
import { getFromLocalStorage } from "./localStorage";
import { setToLocalStorage } from "./localStorage";

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

export const store = createStore(
  rootReducer,
  getFromLocalStorage(),
  applyMiddleware(...middleware)
);

store.subscribe(() =>
  setToLocalStorage({ cartItems: store.getState().cartItems })
);
