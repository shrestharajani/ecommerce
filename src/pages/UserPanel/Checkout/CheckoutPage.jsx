import { Button, Col, Row } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

import { Steps } from 'antd';
import { CheckoutContent } from './ChekoutContent'
import CheckoutCard from './CheckoutCard';
const { Step } = Steps;

export default function CheckoutPage() {

    const [current, setCurrent] = useState(0);

    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };

    return (
        <>
            <Row style={{ margin: '4rem 0' }}>
                <Col span={15} className='checkout-info'>
                    <Steps current={current} onChange={onChange} style={{ width: '90%' }}>
                        {CheckoutContent.map((item) => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div>{CheckoutContent[current].content}</div>
                </Col>
                <Col span={9} >
                    <CheckoutCard />
                </Col>
            </Row>
            <Row justify='space-between'>
                <div>
                    <div>
                        <Link to='/' style={{ textDecoration: 'underline' }}><ArrowLeftOutlined /> Continue Shopping?</Link>
                    </div>
                    <div>
                        <Link to='/add-to-cart' style={{ textDecoration: 'underline' }}><ArrowLeftOutlined /> View Cart</Link>
                    </div>
                </div>
                <Button style={{ color: 'white', backgroundColor: 'coral', borderColor: 'coral' }}>Place Order</Button>
            </Row>
        </>
    )
}
