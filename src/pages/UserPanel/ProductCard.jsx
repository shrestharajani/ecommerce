import React, { useState } from "react";
import { Card, Button, Modal, Col, Row, Divider } from "antd";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/actions/actions";
import { toast } from "react-toastify";
import { itemToCart } from "../../redux/actions/productActions";

const { Meta } = Card;

export default function ProductCard({ product }) {
  const { image, id, price, name, quantity, description, brand, type } =
    product;
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        className="product-card"
        hoverable
        style={{ width: 260 }}
        cover={
          <div className="container">
            <img alt="example" src={image} className="card-image" />
            <div className="middle">
              <Button
                block
                onClick={() => {
                  setIsModalVisible(true);
                }}
              >
                {" "}
                View Details{" "}
              </Button>
            </div>
          </div>
        }
      >
        <Meta title={name} />
        <div className="product-info">
          <div className="price-detail">
            <div>Price</div>
            <div>{price}</div>
          </div>
          <div className="product-info">
            <Button
              type="text"
              onClick={() => {
                dispatch(decrement(id));
              }}
            >
              -
            </Button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <Button
              type="text"
              onClick={() => {
                dispatch(increment(id));
              }}
            >
              +
            </Button>
          </div>
        </div>

        <Button
          type="primary"
          block
          className="add-to-cart"
          onClick={() => {
            dispatch(itemToCart(product));
            toast.success("Product added to cart", {
              icon: "😄",
            });
          }}
        >
          Add to Cart
        </Button>
      </Card>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={800}
      >
        <Row style={{ padding: "2rem" }}>
          <Col span={10} style={{ display: "flex" }}>
            <Card className="product-column">
              <img src={image} alt="not found" />
            </Card>
          </Col>
          <Col span={14}>
            <h1 style={{ color: "coral", textTransform: "uppercase" }}>
              {name}
            </h1>
            <h3 style={{ textTransform: "uppercase" }}>{brand}</h3>
            <div className="price-tag">Rs.{price}</div>
            <Divider />
            <h3 style={{ textTransform: "uppercase" }}>Type : {type}</h3>
            <div>
              <h3>Description</h3>
              {description}
            </div>
            <div className="product-info" style={{ width: "fit-content" }}>
              <Button
                type="text"
                onClick={() => {
                  dispatch(decrement(id));
                }}
              >
                -
              </Button>
              <input
                type="text"
                value={quantity}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <Button
                type="text"
                onClick={() => {
                  dispatch(increment(id));
                }}
              >
                +
              </Button>
            </div>
            <Button
              type="primary"
              block
              className="add-to-cart"
              style={{ width: "fit-content" }}
              onClick={() => {
                dispatch(itemToCart(product));
                toast.success("Product added to cart", {
                  icon: "😄",
                });
              }}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
