import { Card, Radio, Row } from 'antd'
import React from 'react'
import cash from '../../../images/cash.png'
import fone from '../../../images/fone.png'
import esewa from '../../../images/esewa.png'

export default function Payment() {
    return (
        <Row justify='center' gutter={[0, 24]}>
            <Card className='login-card' title="COD">
                <Row justify='center'>
                    <Radio>
                        <div><img src={cash} alt='not found' /></div></Radio>
                    <div className='cod'>Cash on Delivery</div>
                </Row>
            </Card>
            <Card className='login-card' title="Scanning" >
                <Row justify='center'>
                    <Radio>
                        <div><img src={fone} alt='not found' /></div></Radio>
                    <div className='cod'>Scan from FonePay</div>
                </Row>
            </Card>
            <Card className='login-card' title="Online Payment">
                <Row justify='center'>
                    <Radio>
                        <div><img src={esewa} alt='not found' /></div></Radio>
                    <div className='cod'>Esewa</div>
                </Row>
            </Card>
        </Row>
    )
}
