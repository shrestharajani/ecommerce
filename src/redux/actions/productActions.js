import { ActionType } from "./ActionType";
import { firestore_db } from "../../firebase";
import {
  doc,
  getDocs,
  getDoc,
  collection,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const getProductsStart = () => ({
  type: ActionType.GET_PRODUCT,
});

const getProductsSuccess = (products) => ({
  type: ActionType.GET_PRODUCT_SUCCESS,
  payload: products,
});

const getProductsFailed = () => ({
  type: ActionType.GET_PRODUCT_FAIL,
});

const getProductStart = () => ({
  type: ActionType.GET_SINGLE_PRODUCT,
});

const getProductSuccess = (product) => ({
  type: ActionType.GET_SINGLE_PRODUCT_SUCCESS,
  payload: product,
});

const getProductFailed = () => ({
  type: ActionType.GET_SINGLE_PRODUCT_FAIL,
});

const addProductStart = () => ({
  type: ActionType.ADD_PRODUCT,
});

const addProductSuccess = () => ({
  type: ActionType.ADD_PRODUCT_SUCCESS,
});

const addProductFailed = () => ({
  type: ActionType.ADD_PRODUCT_FAIL,
});

const deleteProductStart = () => ({
  type: ActionType.REMOVE_PRODUCT,
});

const deleteProductSuccess = () => ({
  type: ActionType.REMOVE_PRODUCT_SUCCESS,
});

const deleteProductFailed = () => ({
  type: ActionType.REMOVE_PRODUCT_FAIL,
});

const editProductStart = () => ({
  type: ActionType.EDIT_PRODUCT,
});

const editProductSuccess = () => ({
  type: ActionType.EDIT_PRODUCT_SUCCESS,
});

const editProductFailed = () => ({
  type: ActionType.EDIT_PRODUCT_FAILED,
});

export const itemToCart = (product) => {
  return {
    type: ActionType.ITEM_TO_CART,
    payload: product,
  };
};

export const getProduct = () => async (dispatch) => {
  dispatch(getProductsStart());

  const getProducts = await getDocs(collection(firestore_db, "products"));
  // const product = getProductss.docs.map(doc=>doc.data())
  const product = [];
  getProducts.forEach((doc) => {
    product.push({ ...doc.data(), id: doc.id });
  });
  try {
    dispatch(getProductsSuccess(product));
  } catch (error) {
    dispatch(getProductsFailed(error));
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  dispatch(getProductStart());

  const singleProduct = await getDoc(doc(firestore_db, "products", `${id}`));
  try {
    dispatch(getProductSuccess(singleProduct.data()));
  } catch (error) {
    dispatch(getProductFailed(error));
  }
};

export const addProduct = (product) => async (dispatch) => {
  dispatch(addProductStart());

  const addProduct = await setDoc(
    doc(firestore_db, "products", `${Date.now()}`),
    product,
    { merge: true }
  );
  try {
    dispatch(addProductSuccess(addProduct));
  } catch (error) {
    dispatch(addProductFailed(error));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(deleteProductStart());

  await deleteDoc(doc(firestore_db, "products", `${id}`));
  try {
    dispatch(deleteProductSuccess());
  } catch (error) {
    dispatch(deleteProductFailed(error));
  }
};

export const editProduct = (id, product) => async (dispatch) => {
  dispatch(editProductStart());

  const editProduct = await updateDoc(
    doc(firestore_db, "products", `${id}`),
    product
  );
  try {
    dispatch(editProductSuccess(editProduct));
  } catch (error) {
    dispatch(editProductFailed(error));
  }
};
