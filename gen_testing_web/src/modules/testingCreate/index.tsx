import { Breadcrumb, Form, Input, Button, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { findManyUsers } from '../usersList/action';
import { createTestingAction } from './action';
const { Option } = Select;

export const GenTestingCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state: any) => state.gentTestingCreate.data);
  const isLoading = useSelector((state: any) => state.testingCreate.isLoading);
  const paitients = useSelector((state: any) => state.userList.data);

  const paitientOptions = paitients?.map((e: any) => (
    <Option value={e._id}>{e.fullname}</Option>
  ));

  useEffect(() => {
    onInit();
  }, []);

  const onInit = () => {
    dispatch(findManyUsers({
      role: 'PATIENT'
    }));
  }

  const onFinish = (values: any) => {
    dispatch(createTestingAction({
      model: values,
      history,
    }));
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Thêm xét nghiệm</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
      >
        <Form.Item
          name='name'
          rules={[{ required: true, message: 'Vui lòng nhập tên xét nghiệm' }]}
        >
          <Input placeholder='Nhập tên xét nghiệm' />
        </Form.Item>
        {/* <Form.Item
          name='patient'
          rules={[{ required: true, message: 'Vui lòng chọn bệnh nhân' }]}
        >
          <Select
            showSearch
            placeholder='Chọn bệnh nhân'
            optionFilterProp='children'
          >
            {paitientOptions}
          </Select>
        </Form.Item> */}
        <Form.Item>
          <Button loading={isLoading} type='primary' htmlType='submit' className='login-form-button'>
            Tạo xét nghiệm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
