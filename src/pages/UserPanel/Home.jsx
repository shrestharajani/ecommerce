import React, { useEffect } from "react";
import { Col, Row, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "./Slider";
import { getProduct } from "../../redux/actions/productActions";
import ProductCard from "./ProductCard";
import { HomeContent } from "./HomeContent";
import { Link } from "react-router-dom";

const Home = () => {
  const { product_details, loading } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      <Slider />
      {loading ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ) : (
        <div className="product">
          <>
            <Link to="/feature-product">
              <h2 className="main-color">Featured Products (View all)</h2>
            </Link>
            <Row>
              {product_details
                .filter((item) => item.type === "imported")
                .map(
                  (product, index) =>
                    index < 4 && (
                      <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <ProductCard product={product} />
                      </Col>
                    )
                )}
            </Row>
          </>

          {HomeContent.map((items, index) => (
            <div key={index}>
              <Link to={items.link}>
                <h2 style={{ marginTop: "4rem" }} className="main-color">
                  {items.title} {""} (View all)
                </h2>
              </Link>
              <Row justify="space-between">
                {product_details
                  .filter((item) => item.brand === `${items.brand}`)
                  .map(
                    (product, index) =>
                      index < 4 && (
                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                          <ProductCard key={product.id} product={product} />
                        </Col>
                      )
                  )}
              </Row>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
