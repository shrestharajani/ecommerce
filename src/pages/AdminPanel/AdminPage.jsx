import React, { useState } from 'react'
import { AdminSider } from "../../components/AdminSider";
import { useSelector } from 'react-redux';
import { AdminContent } from './AdminContent';
import { Layout, Button, Drawer } from 'antd';
import useResponsive from '../../components/useResponsive';
import { MenuOutlined } from "@ant-design/icons";;
const { Header, Content, Sider } = Layout;

export const AdminPage = () => {
    const content = useSelector(state => state.productReducer.index)
    const [visible, setVisible] = useState(false)

    const breakpoint = 991;
    const width = useResponsive()

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                trigger={null}
                className={`${width > breakpoint ? 'slider fixed' : 'slider'}`}
            >
                <AdminSider />
            </Sider>

            <Layout
                className={`${width > breakpoint && 'admin-layout'}`}
            >
                <Header
                    style={{
                        paddingTop: '1.5rem',
                    }}
                >
                    <h1 style={{ textAlign: 'center', color: "white" }}>AdminPage</h1>
                    {width <= breakpoint &&
                        <Button
                            style={{
                                backgroundColor: '#001529',
                                color: 'white',
                                bottom: '5rem',
                                right: '1rem',
                                border: 'none'
                            }}
                            icon={<MenuOutlined style={{ fontSize: '2rem' }} />}
                            onClick={() => setVisible(true)}
                        />
                    }
                    <Drawer
                        placement="left"
                        onClick={() => setVisible(false)}
                        visible={visible}
                        className='admin-drawer'
                    >
                        <AdminSider />
                    </Drawer>
                </Header>
                <Content
                    style={{
                        margin: '2.4rem 2.4rem 0',
                        overflow: 'initial',
                    }}
                >
                    {AdminContent.filter(item => item.id === content).map((item, index) => (
                        <div key={index}>{item.component}</div>
                    ))}
                </Content>
            </Layout>
        </Layout>
    );
}


