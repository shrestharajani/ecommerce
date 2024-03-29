import { ActionType } from "./ActionType";
import { auth, googleAuthProvider } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const registerStart = () => ({
  type: ActionType.REGISTER_START,
});

const registerSuccess = (user) => ({
  type: ActionType.REGISTER_SUCCESS,
  payload: user,
});

const adminRegisterSuccess = (user) => ({
  type: ActionType.ADMIN_REGISTER_SUCCESS,
  payload: user,
});

const registerFail = (error) => ({
  type: ActionType.REGISTER_FAIL,
  payload: error,
});

const loginStart = () => ({
  type: ActionType.LOGIN_START,
});

const loginSuccess = (user) => ({
  type: ActionType.LOGIN_SUCCESS,
  payload: user,
});

const loginFail = (error) => ({
  type: ActionType.LOGIN_FAIL,
  payload: error,
});

const logoutStart = () => ({
  type: ActionType.LOGIN_START,
});

const logoutSuccess = () => ({
  type: ActionType.LOGIN_SUCCESS,
});

const logoutFail = (error) => ({
  type: ActionType.LOGIN_FAIL,
  payload: error,
});

const googleLoginStart = () => ({
  type: ActionType.GOOGLE_LOGIN_START,
});

const googleLoginSuccess = (user) => ({
  type: ActionType.GOOGLE_LOGIN_SUCCESS,
  payload: user,
});

const googleLoginFail = (error) => ({
  type: ActionType.GOOGLE_LOGIN_FAIL,
  payload: error,
});

export const setUser = (user) => ({
  type: ActionType.SET_USER,
  payload: user,
});

export const registerUser = (email, password) => async (dispatch) => {
  dispatch(registerStart());
  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      dispatch(registerSuccess(user));
    })
    .catch((error) => dispatch(registerFail(error.message)));
};

export const registerAdminUser = (email, password) => async (dispatch) => {
  dispatch(registerStart());
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      dispatch(adminRegisterSuccess(user));
    })
    .catch((error) => dispatch(registerFail(error.message)));
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      dispatch(loginSuccess(user));
    })
    .catch((error) => dispatch(loginFail(error.message)));
};

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutStart());
  signOut(auth)
    .then(() => {
      dispatch(logoutSuccess());
    })
    .catch((error) => dispatch(logoutFail(error.message)));
};

export const googleLoginUser = () => async (dispatch) => {
  dispatch(googleLoginStart());
  signInWithPopup(auth, googleAuthProvider)
    .then(({ user }) => {
      dispatch(googleLoginSuccess(user));
    })
    .catch((error) => dispatch(googleLoginFail(error.message)));
};
