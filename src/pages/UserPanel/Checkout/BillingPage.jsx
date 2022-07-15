import React from 'react'
import { UserOutlined, HomeOutlined, PhoneOutlined, BankOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

export default function BillingPage() {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    const onLogin = () => {
        console.log("Logged in successfully");
    };

    return (
        <Card className="login-card">
            <h1 style={{ color: "coral" }}>Billing Address</h1>
            <Form
                name="normal_login"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
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
                    />
                </Form.Item>
                <Form.Item
                    name="comapany"
                >
                    <Input
                        prefix={<BankOutlined className="site-form-item-icon" />}
                        placeholder="Company Name(Optional)"
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
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button buttons"
                        onClick={onLogin}
                    >
                        <Link to="/admin/admin-page">Continue to Payment</Link>
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}






