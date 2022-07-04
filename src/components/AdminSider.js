import React from 'react'
import { Menu } from 'antd';
import logo from "../images/drinkitall.png";
import { AdminContent } from '../pages/AdminPanel/AdminContent';
import { useDispatch} from 'react-redux';
import { toggleContent } from '../redux/actions/actions';

export const AdminSider = () => {
    const dispatch = useDispatch();
  return (
    <>
        <div className="logo"><img src={logo} alt="not found"/> DrinkItaLL</div>
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['0']}
            style={{fontSize:'1.8rem'}}
        >
            {AdminContent.map((items, index) => (
                <Menu.Item key={index} onClick={()=>{dispatch(toggleContent(index))}}>
                    {items.content}
                </Menu.Item>
            ))}
        </Menu>
    </>
  )
}
