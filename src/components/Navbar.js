import React, { useState } from "react";
import { Menu, Row, Col, Input, Dropdown } from "antd";
import {
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import logo from "../images/drinkitall.png";
import { HomeContent } from "../pages/UserPanel/HomeContent";
import { CartDrawer } from "../pages/UserPanel/CartDrawer";

const { Search } = Input;

const { SubMenu, Item } = Menu;

const Navbar = () => {
  const index = useSelector((state) => state.cartItems.cartItemCount);
  const [current, setCurrent] = useState("home");
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    signOut(auth);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  const menu = (link) => (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to={`/${link}/domestic-${link}`}>Domestic</Link>,
        },
        {
          key: "2",
          label: <Link to={`/${link}/imported-${link}`}>Imported</Link>,
        },
      ]}
    />
  );

  return (
    <>
      <Row justify="space-between">
        <Col xs={6} className="logo">
          <img src={logo} alt="not found" /> DrinkItaLL
        </Col>

        <Col xs={8}>
          <Search placeholder="Search Products" allowClear size="large" />
        </Col>

        <Col xs={6}>
          <Menu onClick={handleClick} mode="horizontal">
            {!user && (
              <Item
                key="register"
                icon={<UserAddOutlined />}
                className="float-right"
              >
                <Link to="/register">Register</Link>
              </Item>
            )}
            {!user && (
              <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
              </Item>
            )}
            {user && (
              <SubMenu
                title={user.email && user.email.split("@")[0]} //name@gmail.com ['name', 'gmail.com']
                icon={<SettingOutlined />}
                className="float-right"
              >
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
                <Item icon={<LogoutOutlined />} onClick={logout}>
                  Logout
                </Item>
              </SubMenu>
            )}
            <Item key="add-to-cart">
              <div className="add-cart" onClick={showDrawer}>
                <div>
                  <ShoppingCartOutlined />
                </div>
                <input
                  type="text"
                  value={index}
                  className="cart"
                  onChange={() => {}}
                />
              </div>
              <CartDrawer visible={visible} onClose={onClose} />
            </Item>
          </Menu>
        </Col>
      </Row>
      <Row>
        <Menu onClick={handleClick} mode="horizontal" selectedKeys={[current]}>
          <Item key="home">
            <Link to="/">Home</Link>
          </Item>

          {HomeContent.map(
            (item, index) =>
              index < 6 && (
                <Item key={item.brand}>
                  <Dropdown overlay={menu(item.brand)} key={item.brand}>
                    <Link to={item.link}>
                      {item.title} <DownOutlined />
                    </Link>
                  </Dropdown>
                </Item>
              )
          )}

          <Item key="kodo">
            <Link to="/kodo">Kodo</Link>
          </Item>
        </Menu>
      </Row>
    </>
  );
};

export default Navbar;
