import React from 'react'
import { Card, Button } from 'antd'
import { useDispatch } from "react-redux"
import { decrement, increment } from "../../redux/actions/actions"
import { toast } from 'react-toastify';
import { itemToCart } from '../../redux/actions/productActions';

const { Meta } = Card;

export default function ProductCard({ product }) {
    const { image, id, price, name, quantity } = product
    const dispatch = useDispatch()
    return (
        <Card
            className='product-card'
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={image} />}
        >
            <Meta title={name} />
            <div className="product-info">
                <div className="price-detail">
                    <div>Price</div>
                    <div>{price}</div>
                </div>
                <div className="product-info">
                    <Button type="text" onClick={() => { dispatch(decrement(id)) }}>-</Button>
                    <input type="text" value={quantity} onChange={(e) => { console.log(e.target.value) }} />
                    <Button type="text" onClick={() => { dispatch(increment(id)) }}>+</Button>
                </div>
            </div>

            <Button type="primary" block
                className="add-to-cart"
                onClick={() => {
                    dispatch(itemToCart(product))
                    toast.success("Product added to cart", {
                        icon: "😄"
                    });
                }}
            >Add to Cart</Button>
        </Card >
    )
}
