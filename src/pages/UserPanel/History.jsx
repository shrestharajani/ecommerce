import React, { useEffect } from "react";
import history from "../../images/download.png";
import { useSelector, useDispatch } from "react-redux";
import { deleteHistory, getOrder } from "../../redux/actions/userActions";
import { Card, Col, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function History() {
  const historyItem = useSelector((state) => state.userReducer.order_details);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const historyDelete = (id) => {
    if (window.confirm("Are you sure you want to delete contact?")) {
      dispatch(deleteHistory(id));
      toast.success("Product deleted successfully", {
        icon: "😄",
      });
    }
    dispatch(getOrder());
  };

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
        <Card
          title={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {item.date}{" "}
              <DeleteOutlined
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => historyDelete(item.id)}
              />
            </div>
          }
          key={{ index }}
        >
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
