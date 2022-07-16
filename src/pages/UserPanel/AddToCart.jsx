import React from 'react'
import { Table, Button, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "../../redux/actions/actions"
import { DeleteOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import emptyCard from '../../images/empty-cart.png'
import { itemDeletedFromCart } from '../../redux/actions/productActions';

const { Text } = Typography

export default function AddToCart() {
    const storageCartItem = useSelector(state => state.cartItems)
    const dispatch = useDispatch()

    const productDelete = (itemId) => {
        const index = storageCartItem.cart_item.findIndex(({ id }) => id === itemId)
        if (index === -1) {
            alert("No id found")
        }
        else {
            const item = storageCartItem.cart_item.splice(index, 1)
            const updatedTotal = storageCartItem.total - (item[0].price * item[0].quantity)
            const updatedCount = storageCartItem.cartItemCount - 1
            dispatch(itemDeletedFromCart(storageCartItem.cart_item, updatedTotal, updatedCount))
        }
    }

    const columns = [
        {
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Product Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            key: 'delete',
            render: (_, product) => (
                <DeleteOutlined
                    style={{ cursor: 'pointer', color: 'red' }}
                    onClick={() => productDelete(product.key)} />
            ),
        },
    ];

    const footer = () => {
        return (
            <>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={columns.length - 1}>
                        Total
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                        <Text style={{ fontWeight: '500' }}>{storageCartItem.total}</Text>
                    </Table.Summary.Cell>
                </Table.Summary.Row>
            </>
        )
    }

    const product = storageCartItem.cart_item.map((product) => ({
        key: product.id,
        image: <div className='product-table-image'><img src={product.image} alt='not found' /></div>,
        name: product.name,
        brand: product.brand,
        quantity: <>
            <div className="card-info">
                <Button type="text" onClick={() => { dispatch(decrement(product.id)) }} className='minus'>-</Button>
                <input type="text" value={product.quantity} onChange={(e) => { console.log('dfdfs') }} />
                <Button type="text" onClick={() => { dispatch(increment(product.id)) }} className='plus'>+</Button>
            </div>
        </>,
        price: product.price * product.quantity
    }))

    return (
        <>
            <h2>Cart</h2>
            <div className='no-cart'>
                {storageCartItem.cart_item.length === 0 && <div className='empty-cart'>
                    <img src={emptyCard} alt='not found' />
                </div>}
            </div>

            <div className='item-inside-cart'>
                <Table
                    columns={columns}
                    dataSource={product}
                    pagination={false}
                    summary={footer}
                    className='cart-table'
                />

                <div className='checkout-buttons'>
                    <Link to='/' style={{ textDecoration: 'underline' }}><ArrowLeftOutlined /> Continue Shopping?</Link>
                    <Link to='/checkout'><Button className='checkout'>Procced to Checkout<ArrowRightOutlined /></Button></Link>
                </div>
            </div>
        </>
    )
}
