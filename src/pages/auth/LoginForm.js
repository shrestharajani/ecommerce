import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, Row, Col } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginState, toggleFrom } from "../../redux/actions/actions";
import { loginUser } from "../../redux/actions/authActions";
import GoogleSign from "./GoogleSign";

export const FormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stateForLogin, setStateForLogin] = useState({
    email: "",
    password: "",
  });
  const { currentUser } = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const { email, password } = stateForLogin;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setStateForLogin({ ...stateForLogin, [name]: value });
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Fields cannot be empty");
    } else {
      toast.success("Login successfully", {
        icon: "😄",
      });
      dispatch(loginUser(email, password));
      dispatch(loginState(false));
    }
  };

  return (
    <Card className="login-card">
      <h1 style={{ color: "coral" }}>Login</h1>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            name="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={handleChange}
            value={email}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            name="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={password}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button buttons"
            onClick={onLogin}
          >
            Log in
          </Button>

          <Row justify="space-between">
            <Col>
              Or{" "}
              <Link
                to=""
                onClick={() => {
                  dispatch(toggleFrom());
                }}
              >
                register now!
              </Link>
            </Col>
            <a className="login-form-forgot" href="/">
              Forgot password?
            </a>
          </Row>
        </Form.Item>
      </Form>
      <GoogleSign />
    </Card>
  );
};
