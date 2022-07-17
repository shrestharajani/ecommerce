import { Drawer, Button, Card, Row, Col } from 'antd';
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import emptyCard from '../../images/empty-cart.png'
import { useDispatch, useSelector } from 'react-redux';
import { itemDeletedFromCart } from '../../redux/actions/productActions';

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
        <Link to='/checkout'><Button>Checkout</Button></Link>
      </div >
    </>
  )

  const deleteCartItem = (itemId) => {
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
            <Row>
              <Col className='cart-first-column' span={4}>
                <div className='cart-image'><img src={item.image} alt='not found' /></div>
              </Col>
              <Col span={12}>{item.name}</Col>
              <Col span={6}>{item.quantity} * {item.price}</Col>
              <Col span={2}><DeleteOutlined
                onClick={() => { deleteCartItem(item.id) }}
                style={{ cursor: 'pointer', color: 'red' }}
              /></Col>
            </Row>
          </Card>
        ))}

      </Drawer>
    </>
  );
};
