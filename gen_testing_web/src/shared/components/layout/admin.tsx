import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { menu } from '../../constants/menu';
import { routes } from '../../constants/router';
import { PrivateRoute } from '../privateRoute';
import { Redirect, Switch } from 'react-router';
import { PageHeader } from '../header';
import { Link } from 'react-router-dom';

const { Content, Footer, Sider } = Layout;

const routesComponent = routes.map((e, index) => {
  return (
    <PrivateRoute
      path={e.path}
      component={e.component}
      key={index}
      exact={e.exact}
    />
  );
});

export const PageLayout = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const role = localStorage.getItem('role') || 'PATIENT';
  const appMenu = menu[role];
  const menuComponent = appMenu.map((e, index) => (
    <Menu.Item key={index}>
      <Link to={e.path}>{e.text}</Link>
    </Menu.Item>
  ));

  return (
    <Layout className='main-page' style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>{menuComponent}</Menu>
      </Sider>
      <Layout className='site-layout'>
        <PageHeader />
        <Content style={{ margin: '15px 16px' }}>
          <div className='site-layout-background' style={{ padding: 24, marginTop: 16, minHeight: 700 }}>
            <Switch>
              {routesComponent}
              <Redirect from='*' to='/gen_testing' />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Gen testing ©2021</Footer>
      </Layout>
    </Layout>
  );
}
