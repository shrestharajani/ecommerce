import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerAdminUser } from "../../redux/actions/authActions";

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stateForLogin, setStateForLogin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = stateForLogin;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setStateForLogin({ ...stateForLogin, [name]: value });
  };

  const onLoginAdmin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Fields cannot be empty");
    } else {
      toast.success("Admin Login successful", {
        icon: "😄",
      });
      dispatch(registerAdminUser(email, password));
      navigate("/admin/admin-page");
    }
  };

  return (
    <div className="form">
      <Card className="login-card">
        <h1 style={{ color: "coral" }}>Admin Login</h1>
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
              onClick={onLoginAdmin}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
