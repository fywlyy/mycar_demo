import React from 'react';
import { Icon, Layout, Menu } from 'antd';
import PropTypes from 'prop-types';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;


const App = props => (
    <Layout>
        <Header className="haers-header" id="haersHeader">
            <div className="haers-logo" />
            <Menu
                className="haers-platform-menu"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1">B2B销售业务平台</Menu.Item>
                <Menu.Item key="2">B2B订单交付控制台</Menu.Item>
                <Menu.Item key="3">采购协同供应商平台</Menu.Item>
            </Menu>
        </Header>
        <Layout>
            <Sider className="haers-sider" width={180}>
                <Menu
                    mode="inline"
                    className="haers-sider-menu"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="sub1" title={<span><Icon type="user" />销售预测管理</span>}>
                        <Menu.Item key="1">列表</Menu.Item>
                        <Menu.Item key="2">计划提报</Menu.Item>
                        <Menu.Item key="3">计划详情</Menu.Item>
                        <Menu.Item key="4">调整确认</Menu.Item>
                    </SubMenu>
                </Menu>

            </Sider>
            <Content className="haers-page-content">
                { props.children }
            </Content>
        </Layout>
    </Layout>
);


App.propTypes = {
    children: PropTypes.element,
};

App.defaultProps = {
    children: null,
};

module.exports = App;
