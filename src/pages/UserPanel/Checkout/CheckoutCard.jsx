import React from 'react'
import emptyCard from '../../../images/empty-cart.png'
import { useSelector } from 'react-redux';
import { Card, Col, Row } from 'antd'

export default function CheckoutCard() {
    const storageCartItem = useSelector(state => state.cartItems)

    return (
        <div style={{ top: '100px', position: 'sticky' }}>
            <Card title="Card Summary">
                <h5>{storageCartItem.cart_item.length} items</h5>
                {storageCartItem.cart_item.length === 0 && <div className='empty-cart'>
                    <img src={emptyCard} alt='not found' />
                </div>}
                {storageCartItem.cart_item.map((item, index) => (
                    <Card key={index} bordered={false}>
                        <Row justify='space-between'>
                            <Col className='cart-first-column'>
                                <div className='cart-image'><img src={item.image} alt='not found' /></div>
                                <div>{item.quantity} * {item.name}</div></Col>
                            <Col> {item.price}</Col>
                        </Row>
                    </Card>
                ))}
                <div
                    style={{
                        borderTop: '1px solid #f0f0f0'
                    }}
                >
                    <Row justify='space-between' style={{ marginTop: '2rem' }}>
                        <Col style={{ color: 'coral' }}><b>Total</b></Col>
                        <Col>{storageCartItem.total}</Col>
                    </Row>
                </div>
            </Card>
        </div>
    )
}
