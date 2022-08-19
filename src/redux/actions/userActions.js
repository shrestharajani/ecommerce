import { ActionType } from "./ActionType";
import { firestore_db } from "../../firebase";
import { doc, getDocs, collection, setDoc } from "firebase/firestore";

const getUserStart = () => ({
  type: ActionType.GET_PRODUCT,
});

const getUserSuccess = (products) => ({
  type: ActionType.GET_PRODUCT_SUCCESS,
  payload: products,
});

const getUserFailed = () => ({
  type: ActionType.GET_PRODUCT_FAIL,
});

const addUserStart = () => ({
  type: ActionType.ADD_PRODUCT,
});

const addUserSuccess = () => ({
  type: ActionType.ADD_PRODUCT_SUCCESS,
});

const addUserFailed = () => ({
  type: ActionType.ADD_PRODUCT_FAIL,
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
  console.log("order", userOrder);
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
