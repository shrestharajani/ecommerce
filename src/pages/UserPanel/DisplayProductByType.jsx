import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from '../../redux/actions/productActions';
import ProductCard from "./ProductCard";

export const DisplayProductByType = ({ brand, title, type }) => {
    const { product_details } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])
    return (
        <>
            <h2 style={{ marginTop: '4rem' }}>{title}</h2>
            <Row justify="space-between" gutter={[0, 24]}>
                {product_details.filter(item => (item.brand === `${brand}` && item.type === `${type}`))
                    .map((product) =>
                    (
                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                            < ProductCard key={product.id}
                                product={product}
                            />
                        </Col>
                    ))}
            </Row>
        </>
    )
}
