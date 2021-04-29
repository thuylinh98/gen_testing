import { Breadcrumb, Button, Row, Col, Table } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { findManyTestingAction } from './action';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';

export const TestingList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.testingList.data);
  const isLoading = useSelector((state: any) => state.testingList.isLoading);

  useEffect(() => {
    onInit();
  }, []);

  const onInit = () => {
    dispatch(findManyTestingAction({}));
  }

  const columns = [
    {
      title: 'Tên xét nghiệm',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Tên bệnh nhân',
    //   dataIndex: ['patient', 'fullname'],
    //   key: 'patient.fullName',
    // },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string, record: any, index: any): any => {
        return moment(text).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Người tạo',
      dataIndex: ['createdBy', 'fullname'],
      key: 'createdBy.fullName',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: any, index: any): any => {
        return (
          <Link to={`gen_testing/${record._id}/results`}>
            <Button icon={<EyeOutlined />} type='primary'>Chi tiết</Button>
          </Link>
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
        <Breadcrumb.Item>Thử nghiệm gen</Breadcrumb.Item>
      </Breadcrumb>
      <Row style={{ marginBottom: 20 }} justify='space-between'>
        <Col span={8}>
          <Link to='/gen_testing/create'>
            <Button icon={<PlusOutlined />} type='primary'>Thêm mới</Button>
          </Link>
        </Col>
      </Row>
      <Table loading={isLoading} columns={columns} dataSource={data} pagination={false} />
    </>
  );
}
