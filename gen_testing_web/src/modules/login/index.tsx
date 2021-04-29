import { Row, Col, Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './action';

export const LoginPage = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state: any) => state.login.data);
  const isLoading = useSelector((state: any) => state.login.isLoading);

  const onFinish = (values: any) => {
    dispatch(loginAction({
      model: {
        username: values.username,
        password: values.password,
      },
      history,
    }));
  };

  return (
    <Row style={{ marginTop: 50 }} justify='center' align='middle'>
      <Col span={8}>
        <Form
          name='normal_login'
          className='login-form'
          onFinish={onFinish}
          initialValues={{ username: 'patient', password: '123456'}}
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Tên tài khoản' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Mật khẩu'
            />
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} type='primary' htmlType='submit' className='login-form-button'>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
