import { Breadcrumb, Form, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { findOneGenAction, updateGenAction } from './action';

export const GenUpdate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state: any) => state?.genUpdate?.data);
  const isLoading = useSelector((state: any) => state?.genUpdate?.isLoading);
  const [form] = Form.useForm()
  const params: any = useParams();

  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const onInit = () => {
    dispatch(findOneGenAction(params.id))
    form.setFieldsValue({});
  }

  const onFinish = (values: any) => {
    dispatch(updateGenAction({
      model: { ...values, id: params.id },
      history,
    }));
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to={'/gens'}>Quản lý gen</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thêm gen</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name='name'
          rules={[{ required: true, message: 'Vui lòng nhập tên gen' }]}
        >
          <Input placeholder='Nhập tên gen' />
        </Form.Item>

        <Form.Item
          name='type'
          rules={[{ required: true, message: 'Vui lòng nhập loại gen' }]}
        >
          <Input placeholder='Nhập loại gen' />
        </Form.Item>

        <Form.Item
          name='property'
          rules={[{ required: true, message: 'Vui lòng nhập thuộc tính gen' }]}
        >
          <Input placeholder='Nhập thuộc tính gen' />
        </Form.Item>

        <Form.Item
          name='affect'
          rules={[{ required: true, message: 'Vui lòng nhập ảnh hưởng của gen' }]}
        >
          <Input placeholder='Nhập ảnh hưởng của gen' />
        </Form.Item>

        <Form.Item
          name='content'
          rules={[{ required: true, message: 'Vui lòng nhập nội dung gen' }]}
        >
          <TextArea rows={5} placeholder='Nhập nội dung của gen' />
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} type='primary' htmlType='submit' className='login-form-button'>
            Chỉnh sửa gen
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
