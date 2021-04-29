import { Breadcrumb, Button, Col, Row, Table, Space, Tag, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
// import { userRole, userStatus } from '../../shared/constants';
import { findPatientTestingListResultAction } from './action';
import { PlusOutlined } from '@ant-design/icons';

export const PatientTestingResultDetail = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.patientTestingDetail.data);
  const isLoading = useSelector((state: any) => state.patientTestingDetail.isLoading);
  const params: any = useParams();

  useEffect(() => {
    onInit();
  }, []);

  const userID = localStorage.getItem('userID');

  const onInit = () => {
    dispatch(findPatientTestingListResultAction({
      patient: userID,
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
            <Link to={`/patients/my_result/${record._id}`}>
              Xem kết quả
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
        <Breadcrumb.Item>Kết quả xét nghiệm</Breadcrumb.Item>
      </Breadcrumb>
      <Row style={{ marginBottom: 20 }} justify='space-between'>
      </Row>
      <Table loading={isLoading} columns={columns} dataSource={data} pagination={false} />
    </>
  );
};