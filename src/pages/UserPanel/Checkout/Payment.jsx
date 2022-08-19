import { Card, Radio, Row, Button } from "antd";
import React from "react";
import cash from "../../../images/cash.png";
import fone from "../../../images/fone.png";
import esewa from "../../../images/esewa.png";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../../../redux/actions/userActions";

export default function Payment() {
  var date = new Date().toDateString();
  const storageCartItem = useSelector((state) => state.cartItems);
  const item = { storageCartItem, date: date };
  const dispatch = useDispatch();

  const placedOrder = () => {
    toast.success("Order placed successfully", {
      icon: "😄",
    });
    dispatch(addOrder(item));
  };
  return (
    <Row justify="center" gutter={[0, 24]}>
      <Card className="login-card" title="COD">
        <Row justify="center">
          <Radio>
            <div>
              <img src={cash} alt="not found" />
            </div>
          </Radio>
          <div className="cod">Cash on Delivery</div>
        </Row>
      </Card>
      <Card className="login-card" title="Scanning">
        <Row justify="center">
          <Radio>
            <div>
              <img src={fone} alt="not found" />
            </div>
          </Radio>
          <div className="cod">Scan from FonePay</div>
        </Row>
      </Card>
      <Card className="login-card" title="Online Payment">
        <Row justify="center">
          <Radio>
            <div>
              <img src={esewa} alt="not found" />
            </div>
          </Radio>
          <div className="cod">Esewa</div>
        </Row>
      </Card>
      <Button
        // block
        style={{
          color: "white",
          backgroundColor: "coral",
          borderColor: "coral",
          width: "80%",
        }}
        onClick={placedOrder}
      >
        Place Order
      </Button>
    </Row>
  );
}
