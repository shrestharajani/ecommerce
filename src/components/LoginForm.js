import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFrom } from "../redux/actions/actions";
import GoogleSign from "./GoogleSign";

export const FormPage = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const onLogin = () => {
    console.log("Logged in successfully");
  };

  return (
    <Card className="login-card">
      <h1 style={{ color: "coral" }}>Login</h1>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button buttons"
            onClick={onLogin}
          >
            <Link to="/admin/admin-page">Log in</Link>
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
