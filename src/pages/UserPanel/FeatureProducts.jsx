import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from '../../redux/actions/productActions';
import ProductCard from "./ProductCard";

export const FeatureProducts = () => {
    const { product_details } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])
    return (
        <>
            <h2 style={{ marginTop: '4rem' }}>Feature Products</h2>
            <Row justify="space-between">
                {product_details.filter(item => item.type === 'imported').map((product) =>
                (
                    <Col xs={24} sm={12} md={8} lg={6}>
                        < ProductCard key={product.id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                        />
                    </Col>
                ))}
            </Row>
        </>
    )
}
