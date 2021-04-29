import { Breadcrumb, Button, Form, Input, Space, Divider, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findOneGenTesting, genTestingUpdate } from './action';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect } from 'react';

export const GenTestingUpdate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state: any) => state.genTestingUpdate.data);
  const isLoading = useSelector((state: any) => state.genTestingUpdate.isLoading);
  const params: any = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])

  const onInit = () => {
    dispatch(findOneGenTesting(params.id));
    form.setFieldsValue({})
  }

  const onFinish = (values: any) => {
    dispatch(genTestingUpdate({
      model: {
        ...values,
        testingId: params.testingId,
        id: params.id
      },
      history,
    }));
  };

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to={'/'}>Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý xét nghiệm</Breadcrumb.Item>
        <Breadcrumb.Item>Chỉnh sửa xét nghiệm thành phần</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        layout='vertical'
        name='dynamic_form_nest_item'
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name='name'
          rules={[{ required: true, message: 'Vui lòng nhập tên xét nghiệm' }]}
        >
          <Input placeholder='Nhập tên xét nghiệm' />
        </Form.Item>

        <Form.Item
          name='description'
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <TextArea rows={5} placeholder='Nhập mô tả xét nghiệm' />
        </Form.Item>

        <Form.List name='gens'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Row key={key}>
                  <Col span={20}>
                    <Space>
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        fieldKey={[fieldKey, 'name']}
                        rules={[{ required: true, message: 'Vui lòng nhập tên khuyến nghị' }]}
                      >
                        <Input placeholder='Nhập tên gen' />
                      </Form.Item>
                    </Space>
                  </Col>
                  <Col span={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <MinusCircleOutlined style={{ fontSize: '20px', color: 'red' }} onClick={() => remove(name)} />
                  </Col>
                  <Divider />
                </Row>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm gen
              </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button loading={isLoading} type='primary' htmlType='submit'>
            Thực hiện chỉnh sửa xét nghiệm thành phần
        </Button>
        </Form.Item>
      </Form>
    </>
  );
};