import { ActionType } from "./ActionType";

export const increment = (id) => {
  return {
    type: ActionType.INCREMENT,
    payload: id,
  };
};

export const decrement = (id) => {
  return {
    type: ActionType.DECREMENT,
    payload: id,
  };
};

export const toggleContent = (id) => {
  return {
    type: ActionType.TOGGLECONTENT,
    payload: { id },
  };
};

export const toggleFrom = () => {
  return {
    type: ActionType.TOGGLEFORM,
  };
};
