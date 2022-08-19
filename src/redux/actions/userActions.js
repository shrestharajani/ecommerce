import { ActionType } from "./ActionType";
import { firestore_db } from "../../firebase";
import { doc, getDocs, collection, setDoc } from "firebase/firestore";

const getUserStart = () => ({
  type: ActionType.GET_USER,
});

const getUserSuccess = (userorders) => ({
  type: ActionType.GET_USER_SUCCESS,
  payload: userorders,
});

const getUserFailed = () => ({
  type: ActionType.GET_USER_FAIL,
});

const addUserStart = () => ({
  type: ActionType.ADD_USER,
});

const addUserSuccess = () => ({
  type: ActionType.ADD_USER_SUCCESS,
});

const addUserFailed = () => ({
  type: ActionType.ADD_USER_FAIL,
});

const addHistoryStart = () => ({
  type: ActionType.ADD_HISTORY_START,
});

const addHistorySuccess = () => ({
  type: ActionType.ADD_PURCHASE_HISTORY,
});

const addHistoryFailed = () => ({
  type: ActionType.ADD_HISTORY_FAIL,
});

const getOrderStart = () => ({
  type: ActionType.GET_HISTORY_START,
});

const getOrderSuccess = (order) => ({
  type: ActionType.GET_PURCHASE_HISTORY,
  payload: order,
});

const getOrderFailed = () => ({
  type: ActionType.GET_HISTORY_FAIL,
});

export const getUser = () => async (dispatch) => {
  dispatch(getUserStart());

  const getUserOrder = await getDocs(collection(firestore_db, "UserOrder"));
  const userOrder = [];
  getUserOrder.forEach((doc) => {
    userOrder.push({ ...doc.data(), id: doc.id });
  });
  try {
    dispatch(getUserSuccess(userOrder));
  } catch (error) {
    dispatch(getUserFailed(error));
  }
};

export const addUser = (userOrder) => async (dispatch) => {
  dispatch(addUserStart());

  const addUserOrder = await setDoc(
    doc(firestore_db, "UserOrder", `${Date.now()}`),
    userOrder,
    { merge: true }
  );
  try {
    dispatch(addUserSuccess(addUserOrder));
  } catch (error) {
    dispatch(addUserFailed(error));
  }
};

export const addOrder = (history) => async (dispatch) => {
  dispatch(addHistoryStart());

  const addhistory = await setDoc(
    doc(firestore_db, "Order History", `${Date.now()}`),
    history,
    { merge: true }
  );
  try {
    dispatch(addHistorySuccess(addhistory));
  } catch (error) {
    dispatch(addHistoryFailed(error));
  }
};

export const getOrder = () => async (dispatch) => {
  dispatch(getOrderStart());

  const getOrder = await getDocs(collection(firestore_db, "Order History"));
  const order = [];
  getOrder.forEach((doc) => {
    order.push({ ...doc.data(), id: doc.id });
  });
  try {
    dispatch(getOrderSuccess(order));
  } catch (error) {
    dispatch(getOrderFailed(error));
  }
};
