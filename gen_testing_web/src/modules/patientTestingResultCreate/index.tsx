import { Breadcrumb, Form, Input, Button, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { findManyTestingAction } from '../testingList/action';
import { findManyUsers } from '../usersList/action';
import { patientTestingResultCreateAction } from './action';

const { Option } = Select;

export const PatientTestingResultCreate = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const history = useHistory();
  const data = useSelector((state: any) => state.gentTestingCreate.data);
  const isLoading = useSelector((state: any) => state.testingCreate.isLoading);
  const paitients = useSelector((state: any) => state.userList.data);

  const testingList = useSelector((state: any) => state.testingList.data);

  const testingOptions = testingList?.map((e: any) => (
    <Option value={e._id}>{e.name}</Option>
  ));

  useEffect(() => {
    onInit();
  }, []);

  const onInit = () => {
    dispatch(findManyUsers({
      role: 'PATIENT'
    }));
    dispatch(findManyTestingAction({}));
  }

  const onFinish = (values: any) => {
    dispatch(patientTestingResultCreateAction({
      model: {
        ...values,
        patient: params.id,
      },
      history,
    }));
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Thêm xét nghiệm cho bệnh nhân</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
      >
        <Form.Item
          name='testingId'
          rules={[{ required: true, message: 'Vui lòng xét nghiệm' }]}
        >
          <Select
            showSearch
            placeholder='Chọn xét nghiệm'
            optionFilterProp='children'
          >
            {testingOptions}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button loading={isLoading} type='primary' htmlType='submit' className='login-form-button'>
            Tạo xét nghiệm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
