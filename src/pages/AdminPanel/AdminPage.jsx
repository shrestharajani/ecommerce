import React, { useState } from "react";
import { AdminSider } from "../../components/AdminSider";
import { useDispatch, useSelector } from "react-redux";
import { AdminContent } from "./AdminContent";
import { Layout, Button, Drawer, Menu, Row, Col, Avatar } from "antd";
import useResponsive from "../../components/useResponsive";
import { MenuOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../../redux/actions/authActions";
const { SubMenu, Item } = Menu;

const { Header, Content, Sider } = Layout;

export const AdminPage = () => {
  const content = useSelector((state) => state.productReducer.index);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminUser } = useSelector((state) => state.authReducer);

  const breakpoint = 991;
  const width = useResponsive();

  const logout = () => {
    if (adminUser) {
      toast.success("Logout successfully", {
        icon: "😄",
      });
      dispatch(logoutUser());
    }
    navigate("/admin");
  };

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        className={`${width > breakpoint ? "slider fixed" : "slider"}`}
      >
        <AdminSider />
      </Sider>

      <Layout className={`${width > breakpoint && "admin-layout"}`}>
        <Header>
          <Row>
            <Col span={21}>
              <h1
                style={{
                  textAlign: "center",
                  color: "white",
                  paddingTop: "1.5rem",
                }}
              >
                AdminPage
              </h1>
            </Col>
            <Col span={3}>
              <Menu
                mode="horizontal"
                style={{ background: "#001529", color: "white" }}
              >
                {!adminUser && (
                  <Item key="login" className="float-right">
                    <Avatar icon={<UserOutlined />} />
                  </Item>
                )}
                {adminUser && (
                  <SubMenu
                    title={adminUser.email && adminUser.email.split("@")[0]}
                    icon={
                      <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        style={{
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                        }}
                      />
                    }
                    className="float-right"
                  >
                    {" "}
                    <Item icon={<LogoutOutlined />} onClick={logout}>
                      Logout
                    </Item>
                  </SubMenu>
                )}
              </Menu>
            </Col>
          </Row>

          {width <= breakpoint && (
            <Button
              style={{
                backgroundColor: "#001529",
                color: "white",
                bottom: "5rem",
                right: "1rem",
                border: "none",
              }}
              icon={<MenuOutlined style={{ fontSize: "2rem" }} />}
              onClick={() => setVisible(true)}
            />
          )}
          <Drawer
            placement="left"
            onClick={() => setVisible(false)}
            visible={visible}
            className="admin-drawer"
          >
            <AdminSider />
          </Drawer>
        </Header>
        <Content
          style={{
            margin: "2.4rem 2.4rem 0",
            overflow: "initial",
          }}
        >
          {AdminContent.filter((item) => item.id === content).map(
            (item, index) => (
              <div key={index}>{item.component}</div>
            )
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
