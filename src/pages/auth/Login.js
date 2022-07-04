import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { async } from "@firebase/util";

const Login = () => {
  const [email, setEmail] = useState("avi.shrestha.775@gmail.com");
  const [password, setPassword] = useState("Avinav1234");
  const [loading, setLoading] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Enter your email address"
        />
        <br />

        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <br />

        <Button
          onClick={handleSubmit}
          type="primary"
          className="mb-3"
          block
          shape="round"
          size="large"
          disabled={!email || password.length < 6}
          icon={<MailOutlined />}
        >
          Login with Email/Password
        </Button>
      </div>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            block
            shape="round"
            size="large"
            disabled={!email || password.length < 6}
            icon={<GoogleOutlined />}
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
          Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
