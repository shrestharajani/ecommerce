import React, { useEffect, useState } from "react";
import { Col, Row, Button, Card, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/actions/productActions";
import ProductCard from "./ProductCard";

export const DisplayProductByBrand = ({ brand, title }) => {
  const { product_details, search_value } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();

  const [minPrice, setminPrice] = useState();
  const [maxPrice, setmaxPrice] = useState();
  const [filterValue, setFilterValue] = useState(false);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  return (
    <>
      <h2 style={{ marginTop: "3rem" }}>{title}</h2>
      <Row gutter={20}>
        <Col span={6}>
          <div style={{ top: "150px", position: "sticky" }}>
            <Card title="Filter Product">
              <div className="filter-product">
                <Input
                  type="number"
                  placeholder="min-price"
                  onChange={(e) => {
                    setminPrice(e.target.value);
                  }}
                  value={minPrice}
                />
                <Input
                  type="number"
                  placeholder="max-price"
                  onChange={(e) => {
                    setmaxPrice(e.target.value);
                  }}
                  value={maxPrice}
                />
              </div>
              <Button
                block
                type="submit"
                onClick={() => {
                  setFilterValue(true);
                }}
                style={{
                  borderColor: "coral",
                  backgroundColor: "coral",
                  color: "white",
                }}
              >
                Filter Products
              </Button>
            </Card>
          </div>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 24]}>
            {filterValue
              ? product_details
                  .filter((item) => item.brand === `${brand}`)

                  .map((product) => (
                    <Col xs={24} sm={12} md={8} lg={8} key={product.id}>
                      <ProductCard key={product.id} product={product} />
                    </Col>
                  ))
              : product_details
                  .filter(
                    (item) =>
                      item.name.toLowerCase().includes(search_value) ||
                      item.brand.toLowerCase().includes(search_value) ||
                      item.type.toLowerCase().includes(search_value)
                  )
                  .filter((item) => item.brand === `${brand}`)
                  .map((product) => (
                    <Col xs={24} sm={12} md={8} lg={8} key={product.id}>
                      <ProductCard key={product.id} product={product} />
                    </Col>
                  ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};
