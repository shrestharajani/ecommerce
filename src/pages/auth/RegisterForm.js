import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, DatePicker } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFrom } from "../../redux/actions/actions";
import { registerUser } from "../../redux/actions/authActions";
import GoogleSign from "./GoogleSign";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [stateForRegister, setStateForRegister] = useState({
    displayName: "",
    email: "",
    password: "",
    repassword: "",
    dob: "",
  });

  const { currentUser } = useSelector((state) => state.authReducer);
  console.log("currentUser", currentUser);

  const { displayName, email, password, repassword, dob } = stateForRegister;

  const calculateAge = (dob) => {
    var fullCurrentDate = new Date();
    var fullBirthDate = new Date(dob);
    var age = fullCurrentDate.getFullYear() - fullBirthDate.getFullYear();
    var month = fullCurrentDate.getMonth() - fullBirthDate.getMonth();
    if (
      month < 0 ||
      (month === 0 && fullCurrentDate.getDate() < fullBirthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const onRegister = (e) => {
    e.preventDefault();
    const verifyAge = calculateAge(dob);
    if (!displayName || !email || !password || !repassword) {
      alert("Fields cannot be empty");
    } else if (password.length < 6) {
      alert("Length of password must be greater than 6 ");
      if (password !== repassword) {
        alert("Password doesnot match");
      }
    } else if (verifyAge < 21) {
      alert("You are not eligible to use this website");
    } else {
      dispatch(registerUser(email, password, displayName));
    }
  };

  const handleRegisterInputChange = (e) => {
    let { name, value } = e.target;
    setStateForRegister({ ...stateForRegister, [name]: value });
  };

  return (
    <Card className="login-card">
      <h1 style={{ color: "coral" }}>Register</h1>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onRegister}
      >
        <Form.Item
          name="displayName"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            name="displayName"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={handleRegisterInputChange}
            value={displayName}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input valid Email Address!",
            },
          ]}
        >
          <Input
            name="email"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={handleRegisterInputChange}
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
            onChange={handleRegisterInputChange}
            value={password}
          />
        </Form.Item>
        <Form.Item
          name="repassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
          ]}
        >
          <Input.Password
            name="repassword"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
            onChange={handleRegisterInputChange}
            value={repassword}
          />
        </Form.Item>
        <Form.Item
          name="dob"
          rules={[
            {
              type: "object",
              // required: true,
              message: "Please select time!",
            },
          ]}
        >
          <DatePicker
            name="dob"
            placeholder="Select date of birth"
            onChange={(date, dateString) => {
              setStateForRegister({ ...stateForRegister, dob: dateString });
            }}
            value={dob}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button buttons"
            onClick={onRegister}
          >
            Register
          </Button>
          Or{" "}
          <Link
            to=""
            onClick={() => {
              dispatch(toggleFrom());
            }}
          >
            login!
          </Link>
        </Form.Item>
      </Form>
      <GoogleSign />
    </Card>
  );
};
