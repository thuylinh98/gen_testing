import { Breadcrumb, Button, Col, Row, Table, Space, Tag, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
// import { userRole, userStatus } from '../../shared/constants';
import { findPaitientTestingResult, sendMailToPatientAction } from './action';
import { PlusOutlined } from '@ant-design/icons';

export const PatientDetail = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.patientDetail.data);
  const isLoading = useSelector((state: any) => state.patientDetail.isLoading);
  const params: any = useParams();

  useEffect(() => {
    onInit();
  }, []);

  const onInit = () => {
    dispatch(findPaitientTestingResult({
      patient: params.id,
    }));
  }

  const sendMailToPatient = () => {
    dispatch(sendMailToPatientAction({
      patient: params.id,
    }));
  }

  const columns = [
    {
      title: 'Họ tên',
      dataIndex: ['patient', 'fullname'],
      key: 'fullname',
    },
    {
      title: 'Tên xét nghiệm',
      dataIndex: ['testingId', 'name'],
      key: 'testingName',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: any, index: any): any => {
        return (
          <>
            <Button type='primary' onClick={sendMailToPatient}>Gởi mail</Button> |
            <Link to={`/patients/${params.id}/testing_results/${record.testingId._id}/list`}>
              Cập nhật kết quả
            </Link>
          </>
        );
      }
    },
  ];

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to={'/gen_testing'}>Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết người dùng</Breadcrumb.Item>
      </Breadcrumb>
      <Row style={{ marginBottom: 20 }} justify='space-between'>
        <Col span={8}>
          <Link to={`/patients/${params.id}/testing_results/create`}>
            <Button  icon={<PlusOutlined />} type='primary'>Thêm xét nghiệm</Button>
          </Link>
        </Col>
        {/* <Col span={4}>
          <Input
          onPressEnter={(e: any) => {
            let fullname = e.target.value;
            if (!fullname || !fullname.length) {
              fullname = null;
            }
            dispatch(findManyUsers({ fullname }));
          }}
          placeholder='Tìm theo tên' />
        </Col> */}
      </Row>
      <Table loading={isLoading} columns={columns} dataSource={data} pagination={false} />
    </>
  );
};