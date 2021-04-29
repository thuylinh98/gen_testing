import { Breadcrumb, Button, Col, Row, Table, Space, Tag, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userRole, userStatus } from '../../shared/constants';
import { findManyUsers } from './action';
import { PlusOutlined } from '@ant-design/icons';

export const PatientList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.patientListByDoctor.data);
  const isLoading = useSelector((state: any) => state.patientListByDoctor.isLoading);

  useEffect(() => {
    onInit();
  }, []);

  const userID = localStorage.getItem('userID');

  const onInit = () => {
    dispatch(findManyUsers({
      createdBy: userID,
      role: 'PATIENT'
    }));
  }

  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text: string, record: any, index: any): any => {
        const status = userStatus[text];
        return <div>{status}</div>
      }
    },
    {
      title: 'Vài trò',
      dataIndex: 'role',
      key: 'role',
      render: (text: string, record: any, index: any): any => {
        const role = userRole[text];
        return <div>{role}</div>
      }
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: any, index: any): any => {
        return (
          <>
            <Link to={`/patients/${record._id}/update`}>
              Sửa
            </Link> | <Link to={`/patients/${record._id}/detail`}>
              Chi tiết
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
        <Breadcrumb.Item>Người dùng</Breadcrumb.Item>
      </Breadcrumb>
      <Row style={{ marginBottom: 20 }} justify='space-between'>
        <Col span={8}>
          <Link to='/patients/create'>
            <Button  icon={<PlusOutlined />} type='primary'>Thêm mới</Button>
          </Link>
        </Col>
        <Col span={4}>
          <Input
          onPressEnter={(e: any) => {
            let fullname = e.target.value;
            if (!fullname || !fullname.length) {
              fullname = null;
            }
            dispatch(findManyUsers({ fullname }));
          }}
          placeholder='Tìm theo tên' />
        </Col>
      </Row>
      <Table loading={isLoading} columns={columns} dataSource={data} pagination={false} />
    </>
  );
};