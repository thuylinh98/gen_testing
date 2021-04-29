import { Breadcrumb, Form, Input, Button, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createPatientAction } from './action';

export const PatientCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state: any) => state.patientCreate.data);
  const isLoading = useSelector((state: any) => state.patientCreate.isLoading);

  useEffect(() => {
    onInit();
  }, []);

  const onInit = () => {
  }

  const onFinish = (values: any) => {
    dispatch(createPatientAction({
      model: { ...values, role: 'PATIENT' },
      history,
    }));
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to={'/gen_testing'}>Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={'/users'}>Quản lý bệnh nhân</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thêm bệnh nhân</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
        >
          <Input placeholder='Nhập tên người dùng' />
        </Form.Item>
        <Form.Item
          name='fullname'
          rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
        >
          <Input
            type='fullname'
            placeholder='Nhập họ tên'
          />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Vui lòng nhập email' }]}
        >
          <Input
            placeholder='Nhập email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input
            placeholder='Nhập mật khẩu'
          />
        </Form.Item>
        <Form.Item
          name='phoneNumber'
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
        >
          <Input
            placeholder='Nhập số điên thoại'
          />
        </Form.Item>
        <Form.Item
          name='status'
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select
            options={[
              { label: 'Kích hoạt', value: 'ACTIVE' },
              { label: 'Chưa kích hoạt', value: 'INACTIVE' },
            ]}
            placeholder='Chọn trạng thái'
          />
        </Form.Item>
        <Form.Item>
          <Button loading={isLoading} type='primary' htmlType='submit' className='login-form-button'>
            Tạo bệnh nhân
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
