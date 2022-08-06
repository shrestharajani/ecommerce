import React, { useState } from "react";
import { Menu, Row, Col, Input, Dropdown,Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  CloseOutlined,
  HistoryOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../images/drinkitall.png";
import { HomeContent } from "../pages/UserPanel/HomeContent";
import { CartDrawer } from "../pages/UserPanel/CartDrawer";
import { FormPage } from "../pages/auth/LoginForm";
import { RegisterPage } from "../pages/auth/RegisterForm";
import { loginState } from "../redux/actions/actions";
import { logoutUser } from "../redux/actions/authActions";
import { toast } from "react-toastify";

const { Search } = Input;

const { SubMenu, Item } = Menu;

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.authReducer);
  const index = useSelector((state) => state.cartItems.cartItemCount);
  const { form_state } = useSelector((state) => state.productReducer);
  const { login_state } = useSelector((state) => state.productReducer);
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

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    if (currentUser) {
      toast.success("Logout successfully", {
        icon: "😄",
      });
      dispatch(logoutUser());
    }
    navigate("/");
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

        <Col xs={8}>
          <Menu onClick={handleClick} mode="horizontal">
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
            {currentUser && <Item key="hhistory" icon={<HistoryOutlined />}>Your History</Item>}
            {!currentUser && (
              <Item
                key="login"
                icon={<UserOutlined />}
                className="float-right"
                onClick={() => {
                  dispatch(loginState(true));
                }}
              >
                Login/Register
              </Item>
            )}
            {login_state && (
              <>
                <div className="modal-heads">
                  <button
                    className="close"
                    onClick={() => {
                      dispatch(loginState(false));
                    }}
                  >
                    <CloseOutlined />
                  </button>
                </div>
                <div
                  className="modal"
                  onClick={() => {
                    dispatch(loginState(false));
                  }}
                >
                  {form_state ? (
                    <div
                      className="nav-login"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <FormPage />
                    </div>
                  ) : (
                    <div
                      className="nav-login"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <RegisterPage />
                    </div>
                  )}
                </div>
              </>
            )}
            {currentUser && (
              <SubMenu
                title={currentUser.email && currentUser.email.split("@")[0]}
                icon={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                className="float-right"
              >
                <Item icon={<LogoutOutlined />} onClick={logout}>
                  Logout
                </Item>
              </SubMenu>
            )}
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
