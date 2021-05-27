import { Breadcrumb, Button, Form, Input, Space, Divider, Row, Col, notification, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { patientTestingResultUpdateAction, findOneGenTesting } from './action';
import { useEffect } from 'react';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

export const PatientTestingResultUpdate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state: any) => state.patientTestingResultUpdate.data);
  const isLoading = useSelector((state: any) => state.patientTestingResultUpdate.isLoading);
  const params: any = useParams()
  const [form] = Form.useForm();

  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])

  const onInit = () => {
    dispatch(findOneGenTesting(params.subTestingId));
  }

  const onFinish = (values: any) => {
    const { recommends, gens, results } = values;
    if (!recommends || !recommends.length || !gens || !gens.length || !results || !results.length) {
      notification.open({
        message: 'Thông báo',
        description: 'Vui lòng nhập đầy đủ thông tin',
      });
      return;
    }

    dispatch(patientTestingResultUpdateAction({
      testingResultId: params.testingResultId,
      patientId: params.id,
      model: {
        testResult: [
          {
            ...values,
          }
        ]
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
        <Breadcrumb.Item>Cập nhật kêt quả xet nghiệm</Breadcrumb.Item>
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
          <Input placeholder='Nhập tên xet nghiệm' readOnly />
        </Form.Item>
        <Form.Item
          name='description'
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <TextArea rows={5} placeholder='Nhập mô tả xét nghiệm' readOnly />
        </Form.Item>

        <Form.List name='results'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Row key={key}>
                  <Col span={20}>
                    <Form.Item
                      label={`Kết quả ${index + 1}`}
                      {...restField}
                      name={[name, 'result']}
                      fieldKey={[fieldKey, 'result']}
                      rules={[{ required: true, message: 'Vui lòng nhập kết quả' }]}
                    >
                      <Input placeholder='Nhập kết quả' />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'content']}
                      fieldKey={[fieldKey, 'content']}
                      rules={[{ required: true, message: 'Vui lòng nhập ý nghĩa kết quả' }]}
                    >
                      <Input.TextArea rows={3} placeholder='Nhập ý nghĩa kết quả' />
                    </Form.Item>
                  </Col>
                  <Col span={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <MinusCircleOutlined style={{ fontSize: '20px', color: 'red' }} onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm kết quả
              </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Divider />
        <Form.List name='recommends'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Row key={key}>
                  <Col span={20}>
                    <Form.Item
                      label={`Khuyến nghị ${index + 1}`}
                      {...restField}
                      name={[name, 'recommend']}
                      fieldKey={[fieldKey, 'recommend']}
                      rules={[{ required: true, message: 'Vui lòng nhập tên khuyến nghị' }]}
                    >
                      <Input placeholder='Nhập tên khuyến nghị' />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'content']}
                      fieldKey={[fieldKey, 'content']}
                      rules={[{ required: true, message: 'Vui lòng nhập nội dung khuyến nghị' }]}
                    >
                      <Input.TextArea rows={3} placeholder='Nhập nội dụng khuyến nghị' />
                    </Form.Item>
                  </Col>
                  <Col span={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <MinusCircleOutlined style={{ fontSize: '20px', color: 'red' }} onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm khuyến nghị
              </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Divider />
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
                        <Input placeholder='Nhập tên gen'  readOnly/>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'type']}
                        fieldKey={[fieldKey, 'type']}
                        rules={[{ required: true, message: 'Vui lòng nhập kiểu gen' }]}
                      >
                        <Input placeholder='Nhập kiểu gen' />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'property']}
                        fieldKey={[fieldKey, 'property']}
                        rules={[{ required: true, message: 'Vui lòng nhập tính chất' }]}
                      >
                        <Input placeholder='Nhập tính chất' />
                      </Form.Item>
                    </Space>
                    <Form.Item
                      {...restField}
                      name={[name, 'affect']}
                      fieldKey={[fieldKey, 'affect']}
                      rules={[{ required: true, message: 'Vui lòng nhập ảnh hưởng' }]}
                    >
                      <Input.TextArea rows={3} placeholder='Nhập ảnh hưởng' />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'content']}
                      fieldKey={[fieldKey, 'content']}
                      rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                    >
                      <Input.TextArea rows={3} placeholder='Nhập nội dụng nội dung' />
                    </Form.Item>
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
            Thực hiện cập nhật kết quả
        </Button>
        </Form.Item>
      </Form>
    </>
  );
};
