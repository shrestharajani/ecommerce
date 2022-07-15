import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFrom } from "../redux/actions/actions";
import GoogleSign from "./GoogleSign";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const onLogin = () => {
    console.log("Logged in successfully");
  };

  return (
    <Card className="login-card">
      <h1 style={{ color: "coral" }}>Register</h1>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email Address!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
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
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirm-password"
          rules={[
            {
              required: true,
              message: "Please confirm your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item
          name="date-picker"
          rules={[
            {
              type: "object",
              required: true,
              message: "Please select time!",
            },
          ]}
        >
          <DatePicker placeholder="Select date of birth" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button buttons"
            onClick={onLogin}
          >
            <Link to="/admin/admin-page">Register</Link>
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
