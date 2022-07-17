import { ActionType } from "./ActionType";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const registerStart = () => ({
  type: ActionType.REGISTER_START,
});

const registerSuccess = (user) => ({
  type: ActionType.REGISTER_SUCCESS,
  payload: user,
});

const registerFail = (error) => ({
  type: ActionType.REGISTER_FAIL,
  payload: error,
});

export const registerUser =
  (email, password, displayName) => async (dispatch) => {
    console.log("djgfjdskf>>>", email, password, displayName);
    dispatch(registerStart());
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        user.updateProfile({ displayName });
        console.log("Users", user);
        dispatch(registerSuccess(user));
      })
      .catch((error) => dispatch(registerFail(error.message)));
  };
