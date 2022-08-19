import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Steps } from "antd";
import CheckoutCard from "./CheckoutCard";
import BillingPage from "./BillingPage";
import Payment from "./Payment";
const { Step } = Steps;

export default function CheckoutPage() {
  const [current, setCurrent] = useState(0);

  const onChange = (value) => {
    setCurrent(value);
  };
  const checkoutContent = [
    {
      id: 1,
      title: "Billing",
      content: <BillingPage setCurrent={setCurrent} />,
    },
    {
      id: 2,
      title: "Payment",
      content: <Payment />,
    },
  ];

  return (
    <>
      <Row style={{ margin: "4rem 0" }}>
        <Col span={15} className="checkout-info">
          <Steps current={current} onChange={onChange} style={{ width: "95%" }}>
            {checkoutContent.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="checkout-content">
            {checkoutContent[current].content}
          </div>
        </Col>
        <Col span={9}>
          <CheckoutCard />
        </Col>
      </Row>
      <Row justify="space-between">
        <div>
          <div>
            <Link to="/" style={{ textDecoration: "underline" }}>
              <ArrowLeftOutlined /> Continue Shopping?
            </Link>
          </div>
          <div>
            <Link to="/add-to-cart" style={{ textDecoration: "underline" }}>
              <ArrowLeftOutlined /> View Cart
            </Link>
          </div>
        </div>
        <Button
          style={{
            color: "white",
            backgroundColor: "coral",
            borderColor: "coral",
          }}
        >
          Place Order
        </Button>
      </Row>
    </>
  );
}
