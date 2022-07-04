import { Drawer, Button, Card, Row, Col } from 'antd';
import { LeftOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import emptyCard from '../../images/empty-cart.png'
import { useDispatch, useSelector } from 'react-redux';
import { itemToCart } from '../../redux/actions/productActions';

export const CartDrawer = ({ onClose, visible }) => {
  const storageCartItem = useSelector(state => state.cartItems)
  const dispatch = useDispatch()

  const footer = (
    <>
      <div className='mini-cart'>
        <p>Total</p>
        <p>{storageCartItem.total}</p>
      </div>
      <div className='checkout-buttons'>
        <Button style={{
          borderColor: 'coral',
          color: 'coral',
        }} ghost><Link to='/add-to-cart' onClick={onClose}>View Cart</Link></Button>
        <Button>Checkout<ArrowRightOutlined /></Button>
      </div >
    </>
  )

  const deleteCartItem = (id) => {
    const index = storageCartItem.cart_item.filter(item => item.id !== id)
    console.log("index", index)
    const items = storageCartItem.cart_item.slice(index, 1)
    console.log("items", items)
    dispatch(itemToCart(index))
  }

  return (
    <>
      <Drawer
        title="Continue Shoping"
        placement="right"
        onClose={onClose}
        visible={visible}
        closeIcon={<LeftOutlined style={{ color: 'white' }} />}
        footer={storageCartItem.cart_item.length > 0 && footer}
        headerStyle={{
          background: 'coral',
        }}
        footerStyle={{
          background: '#fafafa'
        }}
      >
        <h3>Your Cart</h3>
        {storageCartItem.cart_item.length === 0 && <div className='empty-cart'>
          <img src={emptyCard} alt='not found' />
        </div>}
        {storageCartItem.cart_item.map((item, index) => (
          <Card className='mini-cart--card' key={index} style={{
            marginBottom: '2rem'
          }}>
            <Row justify='space-between'>
              <Col className='cart-first-column'>
                <div className='cart-image'><img src={item.image} alt='not found' /></div>
                <div>{item.name}</div></Col>
              <Col>{item.quantity} * {item.price}</Col>
              <DeleteOutlined
                onClick={() => { deleteCartItem(item.id) }}
                style={{ cursor: 'pointer', color: 'red' }}
              />
            </Row>
          </Card>
        ))}

      </Drawer>
    </>
  );
};
