import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!email || !password) {
      toast.error("Email and password must be provided");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters");
      return;
    }

    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");

        // get user id token
        const user = auth.currentUser;
        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();

        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);
        // redirect
        navigate("/");
      }

      //   console.log("RESULT", result);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        disabled
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />

      <button type="submit" className="btn btn-raised">
        Completed Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Registration Completed</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
