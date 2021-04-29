import { Col, Dropdown, Layout, Menu, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
const { Header } = Layout;

export const PageHeader = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/auth/login');
  }

  const userMenu = (
    <Menu className='menu-avatar'>
      <Menu.Item onClick={handleLogout}>
        <LogoutOutlined />
        <span>Đăng xuất</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className='site-layout-background' style={{ paddingRight: 15 }}>
      <Row justify='space-between'>
        <Col>
            <div className='page-title'>Quản lý kết quả xét nghiệm</div>
        </Col>
        <Col>
          <Dropdown trigger={['click']} overlay={userMenu} placement="bottomRight">
              <Avatar size='large' src='https://banner2.cleanpng.com/20180530/qct/kisspng-cristiano-ronaldo-computer-icons-avatar-portugal-n-5b0ec49b5d50f9.2926556215276944913822.jpg' />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}
