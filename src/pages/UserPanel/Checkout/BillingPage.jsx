import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  PhoneOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Card, Col, Row } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/actions/userActions";

export default function BillingPage({ setCurrent }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    id: Date.now(),
    first_name: "",
    last_name: "",
    phone_number: "",
    company: "",
    address: "",
  });

  const { first_name, last_name, phone_number, company, address } = state;

  const onPayment = () => {
    if (!first_name && !last_name && !phone_number && !address) {
      alert("Fields cannot be empty");
    } else {
      dispatch(addUser(state));
      setCurrent(1);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <Card className="login-card">
      <h1 style={{ color: "coral" }}>Billing Address</h1>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="first_name"
              rules={[
                {
                  required: true,
                  message: "Please input first name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="First Name"
                name="first_name"
                onChange={handleInputChange}
                value={first_name || ""}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "Please input last name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Last Name"
                name="last_name"
                onChange={handleInputChange}
                value={last_name}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="phone_number"
          rules={[
            {
              required: true,
              message: "Please input your contact number!",
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            type="number"
            placeholder="Phone Number"
            name="phone_number"
            onChange={handleInputChange}
            value={phone_number}
          />
        </Form.Item>
        <Form.Item name="comapany">
          <Input
            prefix={<BankOutlined className="site-form-item-icon" />}
            placeholder="Company Name(Optional)"
            name="company"
            onChange={handleInputChange}
            value={company}
          />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Please enter your address!",
            },
          ]}
        >
          <Input
            prefix={<HomeOutlined className="site-form-item-icon" />}
            placeholder="Address"
            name="address"
            onChange={handleInputChange}
            value={address}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button buttons"
            onClick={onPayment}
          >
            Continue to Payment
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
