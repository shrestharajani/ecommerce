import React, { useEffect } from "react";
import history from "../../images/download.png";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../../redux/actions/userActions";
import { Card, Col, Row } from "antd";

export default function History() {
  const historyItem = useSelector((state) => state.userReducer.order_details);
  console.log("history", historyItem);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <div>
      <h3>Your History</h3>

      {historyItem.length === 0 && (
        <div className="history">
          <div>
            <img src={history} alt="not found" />
            <p>Sorry no purchase history yet</p>
          </div>
        </div>
      )}
      {historyItem.map((item, index) => (
        <Card title={item.date} key={{ index }}>
          <h5>{item.storageCartItem.cart_item.length} items</h5>
          {item.storageCartItem.cart_item.map((item, index) => (
            <Card key={index} bordered={false}>
              <Row justify="space-between">
                <Col className="cart-first-column" span={5}>
                  <div className="cart-image">
                    <img src={item.image} alt="not found" />
                  </div>
                </Col>
                <Col span={16}>
                  {item.quantity} * {item.name}
                </Col>
                <Col span={2}> {item.price}</Col>
              </Row>
            </Card>
          ))}
          <div
            style={{
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <Row justify="space-between" style={{ marginTop: "2rem" }}>
              <Col style={{ color: "coral" }}>
                <b>Total</b>
              </Col>
              <Col>{item.storageCartItem.total}</Col>
            </Row>
          </div>
        </Card>
      ))}
    </div>
  );
}
